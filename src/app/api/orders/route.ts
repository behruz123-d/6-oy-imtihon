import {NextResponse} from 'next/server';
import {randomUUID} from 'crypto';

type Order={productName:string;qty:number;price?:number;name:string;phone:string;email:string;address:string;total:number;items?:Array<{name:string;price:number;qty:number;color?:string;capacity?:number}>};
export async function POST(req:Request){
 const order=await req.json().catch(()=>null) as Order|null;
 if(!order?.name||!order.phone||!order.email||!order.address||!order.productName) return NextResponse.json({message:'Buyurtma uchun profil ma’lumotlari to‘liq emas.'},{status:400});
 const token=process.env.TELEGRAM_BOT_TOKEN; const chatId=process.env.TELEGRAM_CHAT_ID;
 if(!token||!chatId) return NextResponse.json({message:'Telegram bot sozlanmagan.'},{status:500});
 const id=`IPH-${new Date().getFullYear()}-${randomUUID().slice(0,8).toUpperCase()}`;
 const itemLines=(order.items||[]).map((x,i)=>`${i+1}. ${x.name} — ${x.color||'-'} — ${x.capacity||'-'} GB — x${x.qty} — ${(x.price*x.qty).toLocaleString()} so‘m`).join('\n');
 const text=`🛒 YANGI BUYURTMA\n\n🆔 ID: ${id}\n\n${itemLines||`📱 Mahsulot: ${order.productName}`}\n\n💵 Jami: ${order.total.toLocaleString()} so‘m\n\n👤 Ism: ${order.name}\n📞 Telefon: ${order.phone}\n📧 Email: ${order.email}\n🏠 Manzil: ${order.address}\n🕐 ${new Date().toLocaleString('uz-UZ',{timeZone:'Asia/Tashkent'})}`;
 try{
  const r=await fetch(`https://api.telegram.org/bot${token}/sendMessage`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({chat_id:chatId,text})});
  const tg=await r.json().catch(()=>null);
  if(!r.ok||!tg?.ok) return NextResponse.json({message:'Telegramga xabar yuborilmadi.'},{status:502});
  return NextResponse.json({ok:true,orderId:id});
 }catch{return NextResponse.json({message:'Telegram serveriga ulanib bo‘lmadi.'},{status:502});}
}
