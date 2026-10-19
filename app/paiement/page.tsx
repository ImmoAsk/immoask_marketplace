import Container from "@/components/ui/Container"
import PayLater from "@/features/payment/components/PayLater"
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
            Test des boutons PayNow et PayLater. Un montant de 2 000 XOF ouvre
            l&apos;URL de paiement ou enregistre une transaction en attente.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <PayNow
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
            <PayLater
              label="Payer plus tard"
              description="Test paiement différé ImmoAsk"
              montant={2000}
              email_visitor="kossi.adanou@omnisoft.africa"
              telephone_visitor="+22893102163"
              fullname_visitor="Kossi Adanou"
            />
          </div>
        </section>
      </Container>
    </main>
  )
}
