import {NextResponse} from 'next/server';
import type {Order} from '../../../..//types';
export async function POST(req:Request){
 const order=await req.json().catch(()=>null) as Order|null;
 if(!order?.id||!order.name) return NextResponse.json({message:'Buyurtma ma’lumotlari yetishmaydi.'},{status:400});
 const token=process.env.TELEGRAM_BOT_TOKEN; const chatId=process.env.TELEGRAM_CHAT_ID;
 if(!token||!chatId) return NextResponse.json({message:'Telegram bot sozlanmagan.'},{status:500});
 const text=`❌ BUYURTMA OTMEN QILINDI\n\n🆔 ID: ${order.id}\n👤 Ism: ${order.name}\n📞 Telefon: ${order.phone}\n💵 Jami: ${order.total.toLocaleString()} so‘m\n🕐 ${new Date().toLocaleString('uz-UZ',{timeZone:'Asia/Tashkent'})}`;
 try{const r=await fetch(`https://api.telegram.org/bot${token}/sendMessage`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({chat_id:chatId,text})}); const tg=await r.json().catch(()=>null); if(!r.ok||!tg?.ok)return NextResponse.json({message:'Bekor qilish xabari Telegramga yuborilmadi.'},{status:502}); return NextResponse.json({ok:true});}
 catch{return NextResponse.json({message:'Telegram serveriga ulanib bo‘lmadi.'},{status:502});}
}
