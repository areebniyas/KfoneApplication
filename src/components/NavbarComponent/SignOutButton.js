import { useRouter } from "next/router";
import { signOut } from 'next-auth/react'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Button } from '@mui/material';

export default function SignOutButton() {
  const router = useRouter();

  function signOutHandler() {
    router.push("/api/auth/federated-sign-out");
  }

  return (
    <Button type="button" variant="outlined" endIcon={<ExitToAppIcon/>} onClick={() => {
      signOutHandler();
      signOut({ redirect: false }).then(() => {
        router.push("/");
      });
    }}>
      Sign out
    </Button>
  );
}
