import { ValidatorAuthProvider } from "../../components/validator-auth-provider"

export default function ValidatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ValidatorAuthProvider>{children}</ValidatorAuthProvider>
}