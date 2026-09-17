import Container from "@/components/ui/Container"
import PayNow from "@/features/payment/components/PayNow"

export default function PaiementPage() {
  return (
    <main className="bg-surface py-16">
      <Container className="max-w-md">
        <section className="rounded-2xl bg-white p-6 shadow-card">
          <h1 className="text-2xl font-bold tracking-tight text-navy">
            Paiement FedaPay
          </h1>
          <p className="mt-2 text-sm text-muted">
            Test du bouton PayNow. Un montant de 2 000 XOF ouvre l&apos;URL de
            paiement renvoyée par l&apos;API.
          </p>

          <PayNow
            className="mt-6"
            description="Test paiement ImmoAsk"
            amount={2000}
            firstname="Kossi"
            lastname="Adanou"
            phone="+22893102163"
            email="kossi.adanou@omnisoft.africa"
            callback_url="https://www.immoask.com/tg"
            country_code="TG"
            currency="XOF"
          />
        </section>
      </Container>
    </main>
  )
}
