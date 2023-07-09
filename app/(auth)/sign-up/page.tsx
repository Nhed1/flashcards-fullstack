import ContainerCenter from "@/components/container-center";
import { SignUp } from "@clerk/nextjs/app-beta";

export default function SignUpPage() {
  return (
    <ContainerCenter>
      <SignUp />
    </ContainerCenter>
  );
}
