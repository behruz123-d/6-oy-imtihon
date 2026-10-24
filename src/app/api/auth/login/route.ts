import { NextResponse } from 'next/server';
export async function POST(req:Request){
  const body=await req.json().catch(()=>null) as {login?:string;password?:string}|null;
  if(!body?.login||!body.password) return NextResponse.json({message:'Telefon/email va parolni kiriting.'},{status:400});
  // Actual credential validation is handled by the client demo store. This endpoint is the Next.js backend hook for a real DB.
  return NextResponse.json({message:'Demo login endpoint. Client authentication should be backed by a database in production.'},{status:501});
}
