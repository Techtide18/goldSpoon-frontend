import { redirect } from "next/navigation";
import { auth } from "@/auth";
import Link from "next/link";

export default async function Home() {
	const session = await auth();
	//if (!session) redirect("/login");
	console.log("Home Page Session: ", session);
	//console.log(session?.user);
	
	return (
		<div className='max-w-xl mx-auto mt-20'>
			 <div className='text-4xl text-gray-800'>Welcome {session.user?.name}</div> 
			<Link href='/api/auth/signout'>Logout</Link>
		</div>
	);
}