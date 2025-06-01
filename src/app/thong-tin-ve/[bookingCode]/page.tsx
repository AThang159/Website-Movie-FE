import { TicketConfirmation } from "@/components/ticket-confirmation"

export default async function TicketConfirmationPage({ params }: { params: { bookingCode: string } }) {
 
  return (
    <div className="flex min-h-screen flex-col">
      <TicketConfirmation bookingCode={params.bookingCode}/>
    </div>
  )
}