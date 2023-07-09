import ContainerCenter from "@/components/container-center";
import { SignIn } from "@clerk/nextjs/app-beta";

export default function SignInPage() {
  return (
    <ContainerCenter>
      <SignIn />
    </ContainerCenter>
  );
}
