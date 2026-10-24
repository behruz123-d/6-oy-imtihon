'use client';
import {useMemo,useState} from 'react';
import {useParams,useRouter} from 'next/navigation';
import {ArrowLeft,Check,ShoppingBag,Star} from 'lucide-react';
import {capacityPrice,findProduct} from '../../../data/products';
import {useEffect} from 'react';
import type {CartItem} from '../../../types';

export default function ProductPage(){
  const params=useParams(); const router=useRouter();
  const product=useMemo(()=>findProduct(Number(params.id)),[params.id]);
  const [color,setColor]=useState(''); const [capacity,setCapacity]=useState<number|null>(null); const [added,setAdded]=useState(false);
  useEffect(()=>{if(product){setColor(product.variants[0]?.color||'');setCapacity(product.variants[0]?.capacities[0]||128)}},[product]);
  if(!product) return <main className="detail-page"><div className="container"><h1>Mahsulot topilmadi.</h1><button className="apple-btn dark" onClick={()=>router.push('/')}>Do‘konga qaytish</button></div></main>;
  const selected=product.variants.find(v=>v.color===color)||product.variants[0];
  const caps=selected.capacities;
  const chosenCapacity=capacity ?? caps[0]; const price=product.price+capacityPrice(chosenCapacity);
  const add=()=>{
    const cart:CartItem[]=JSON.parse(localStorage.getItem('iphone_cart')||'[]');
    const existing=cart.find(x=>x.id===product.id&&x.color===color&&x.capacity===chosenCapacity);
    const next=existing?cart.map(x=>x===existing?{...x,qty:x.qty+1}:x):[...cart,{id:product.id,name:product.name,price,image:product.image,qty:1,color,capacity:chosenCapacity}];
    localStorage.setItem('iphone_cart',JSON.stringify(next)); setAdded(true); setTimeout(()=>router.push('/?openCart=1'),350);
  };
  return <main className="detail-page"><div className="container"><button className="back-link" onClick={()=>router.back()}><ArrowLeft size={18}/> Orqaga</button><div className="detail-card"><div className="detail-visual" style={{background:'linear-gradient(145deg,#f5f5f7,#dde4ea)'}}><span className="model-pill">{product.category}</span><img src={product.image} alt={product.name}/></div><div className="detail-copy"><span className="eyebrow">{product.tagline}</span><h1>{product.name}</h1><div className="rating large"><Star size={16} fill="currentColor"/><span>{product.rating}</span></div><p className="detail-description">Original iPhone modeli. Rang va xotira tanlovini o‘zgartirsangiz narx avtomatik yangilanadi.</p><div className="selector-block"><h3>Rang</h3><div className="swatches">{product.variants.map(v=><button title={v.color} key={v.color} className={color===v.color?'swatch selected':'swatch'} onClick={()=>{setColor(v.color);if(capacity===null||!v.capacities.includes(capacity))setCapacity(v.capacities[0])}}><span style={{background:v.colorHex}}/>{color===v.color&&<Check size={14}/>}<small>{v.color}</small></button>)}</div></div><div className="selector-block"><h3>Xotira</h3><div className="storage-grid">{caps.map(x=><button key={x} className={chosenCapacity===x?'storage active':'storage'} onClick={()=>setCapacity(x)}>{x>=1024?`${x/1024} TB`:`${x} GB`}</button>)}</div></div><div className="feature-row">{product.features.map(f=><span key={f}><Check size={14}/>{f}</span>)}</div><div className="detail-buy"><div><span>Narx</span><strong>{price.toLocaleString()} so‘m</strong></div><button className="apple-btn dark" onClick={add}><ShoppingBag size={17}/>{added?'Savatga qo‘shildi':'Savatga qo‘shish'}</button></div></div></div></div></main>
}
