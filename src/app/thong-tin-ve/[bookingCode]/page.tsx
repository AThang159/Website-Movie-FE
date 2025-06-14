import { TicketConfirmation } from "@/components/ticket-confirmation"
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default async function TicketConfirmationPage({ params }: { params: { bookingCode: string } }) {
 
  return (
    <div className="flex min-h-screen flex-col">
      <Header/>
      <TicketConfirmation bookingCode={params.bookingCode}/>
      <Footer/>
    </div>
  )
}