import { NextResponse } from 'next/server';
export async function POST(req:Request){
  const body=await req.json().catch(()=>null) as {name?:string;phone?:string;email?:string;password?:string}|null;
  if(!body?.name||!body.phone||!body.email||!body.password) return NextResponse.json({message:'Barcha maydonlarni to‘ldiring.'},{status:400});
  if(body.password.length<6) return NextResponse.json({message:'Parol kamida 6 ta belgidan iborat bo‘lsin.'},{status:400});
  const user={id:crypto.randomUUID(),name:body.name,phone:body.phone,email:body.email,address:''};
  return NextResponse.json({token:`demo-${user.id}`,user});
}
