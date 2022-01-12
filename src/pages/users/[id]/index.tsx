import type { NextPage } from "next";
import { useRouter } from "next/router";

const UserPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <>User ID: {id}</>;
};

export default UserPage;
