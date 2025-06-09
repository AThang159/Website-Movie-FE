import * as z from "zod"
import { ShowtimeRequest } from "@/types/showtime-request";


export interface ValidationError {
  field: keyof ShowtimeRequest;
  message: string;
}

interface BaseValidationRule {
  required: boolean;
  message: string;
}

interface StringValidationRule extends BaseValidationRule {
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
}

interface NumberValidationRule extends BaseValidationRule {
  min?: number;
  max?: number;
}

type ValidationRule = StringValidationRule | NumberValidationRule;

export const validationRules: Record<keyof ShowtimeRequest, ValidationRule> = {
  movieCode: {
    required: true,
    message: "Vui lòng chọn phim"
  },
  theaterId: {
    required: true,
    message: "Vui lòng chọn rạp chiếu"
  },
  roomId: {
    required: true,
    message: "Vui lòng chọn phòng chiếu"
  },
  showDate: {
    required: true,
    pattern: /^\d{4}-\d{2}-\d{2}$/,
    message: "Ngày chiếu không hợp lệ"
  },
  startTime: {
    required: true,
    pattern: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
    message: "Giờ chiếu không hợp lệ"
  },
  language: {
    required: true,
    pattern: /^(PHU_DE_VIET|LONG_TIENG_VIET)$/,
    message: "Ngôn ngữ không hợp lệ"
  },
  price: {
    required: true,
    min: 0,
    message: "Giá vé phải lớn hơn hoặc bằng 0"
  },
  status: {
    required: false,
    message: ""
  }
};

export function validateShowtimeForm(data: ShowtimeRequest): ValidationError[] {
  const errors: ValidationError[] = [];

  Object.entries(validationRules).forEach(([field, rules]) => {
    const value = data[field as keyof ShowtimeRequest];

    if (rules.required && !value) {
      errors.push({ field: field as keyof ShowtimeRequest, message: rules.message });
      return;
    }

    if (typeof value === 'string') {
      const stringRules = rules as StringValidationRule;
      if (stringRules.pattern && !stringRules.pattern.test(value)) {
        errors.push({ field: field as keyof ShowtimeRequest, message: rules.message });
      }
    }

    if (typeof value === 'number') {
      const numberRules = rules as NumberValidationRule;
      if (numberRules.min && value < numberRules.min) {
        errors.push({ field: field as keyof ShowtimeRequest, message: rules.message });
      }
      if (numberRules.max && value > numberRules.max) {
        errors.push({ field: field as keyof ShowtimeRequest, message: rules.message });
      }
    }
  });

  // Validate show date is not in the past
  if (data.showDate) {
    const showDate = new Date(data.showDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (showDate < today) {
      errors.push({
        field: 'showDate',
        message: 'Ngày chiếu phải từ hôm nay trở đi'
      });
    }
  }

  return errors;
} 