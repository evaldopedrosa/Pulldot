import React from 'react';
import {AbsoluteFill, Composition, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';

const c = {bg:'#0d1414',shell:'#161d1d',side:'#202727',panel:'#192121',raised:'#283231',edge:'#38433f',mint:'#89e5c1',white:'#edf2ee',muted:'#a8b5af'};
const clamp = {extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};
const tween=(f:number,a:number,b:number,x=0,y=1)=>interpolate(f,[a,b],[x,y],clamp);
const card=(selected=false):React.CSSProperties=>({background:selected?'#2b3b36':c.panel,border:`1.5px solid ${selected?c.mint:c.edge}`,borderRadius:15});

function Icon({kind,color=c.muted,size=26}:{kind:string;color?:string;size?:number}){
 const p={width:size,height:size,viewBox:'0 0 24 24',fill:'none',stroke:color,strokeWidth:1.8,strokeLinecap:'round' as const,strokeLinejoin:'round' as const};
 if(kind==='download')return <svg {...p}><path d="M12 3v12m-4-4 4 4 4-4M4 18v3h16v-3"/></svg>;
 if(kind==='folder')return <svg {...p}><path d="M3 7h7l2 2h9v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM3 10h18"/></svg>;
 if(kind==='video')return <svg {...p}><rect x="3" y="5" width="13" height="14" rx="2"/><path d="m16 9 5-3v12l-5-3"/></svg>;
 if(kind==='audio')return <svg {...p}><path d="M3 10v4m4-8v12m4-16v20m4-15v10m4-7v4m3-6v8"/></svg>;
 if(kind==='check')return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/></svg>;
 return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10h.01"/></svg>;
}
function Thumb(){return <div style={{height:94,width:147,borderRadius:13,overflow:'hidden',position:'relative',flex:'none',background:'linear-gradient(180deg,#82a8b3 0%,#b8d2c9 52%,#668d80 53%,#1c4540 100%)'}}>
 <div style={{position:'absolute',width:210,height:100,borderRadius:'50%',background:'#d4dfd1',top:60,left:-65,transform:'rotate(-14deg)'}}/>
 <div style={{position:'absolute',width:240,height:100,borderRadius:'50%',background:'#47746b',top:79,left:40,transform:'rotate(-14deg)'}}/>
 <div style={{position:'absolute',width:240,height:95,borderRadius:'50%',background:'#214b45',top:100,left:-10}}/>
 <div style={{position:'absolute',width:37,height:37,borderRadius:'50%',background:'#f6e2aa',top:21,left:113}}/>
 </div>}
function Demo(){
 const f=useCurrentFrame();
 const appOpacity=tween(f,0,18);
 const url='https://vimeo.com/coastal-light';
 const shown=url.slice(0,Math.round(url.length*tween(f,35,77)));
 const media=f>=99, chosen=f>=143, downloading=f>=166, done=f>=308;
 const progress=downloading?Math.round(tween(f,166,306,2,100)):0;
 const transferred=(31.6*progress/100).toFixed(1);
 const mouseX=tween(f,115,140,530,369), mouseY=tween(f,115,140,625,532);
 const mouseX2=tween(f,146,166,mouseX,490),mouseY2=tween(f,146,166,mouseY,770);
 return <AbsoluteFill style={{background:c.bg,fontFamily:'-apple-system,BlinkMacSystemFont,"SF Pro Display",Arial,sans-serif',color:c.white,overflow:'hidden'}}>
  <div style={{position:'absolute',width:1000,height:600,left:450,top:-250,background:'radial-gradient(ellipse,rgba(95,185,145,.15),transparent 70%)'}}/>
  <div style={{position:'absolute',left:164,top:39,fontSize:24,fontWeight:700,opacity:appOpacity}}>Pulldot <span style={{fontWeight:450,color:c.muted}}>· From link to local</span></div>
  <div style={{position:'absolute',left:164,top:92,width:1592,height:910,borderRadius:24,overflow:'hidden',border:`1px solid ${c.edge}`,background:c.shell,boxShadow:'0 30px 90px #0008',opacity:appOpacity,transform:`translateY(${tween(f,0,22,48,0)}px)`}}>
   <div style={{height:39,background:'#252d2d',borderBottom:`1px solid ${c.edge}`,display:'flex',gap:9,alignItems:'center',paddingLeft:23,boxSizing:'border-box'}}>
    {['#fc6863','#f5bd4f','#5cc65c'].map(x=><div key={x} style={{width:12,height:12,borderRadius:12,background:x}}/>)}<span style={{position:'absolute',left:'50%',transform:'translateX(-50%)',fontSize:15,color:c.muted}}>Pulldot</span>
   </div>
   <div style={{display:'flex',height:823}}>
    <div style={{width:581,background:c.side,borderRight:`1px solid ${c.edge}`,boxSizing:'border-box',padding:'28px 34px',position:'relative'}}>
     <div style={{display:'flex',alignItems:'center',gap:13}}><Img src={staticFile('pulldot-mark.png')} style={{width:48,height:48,borderRadius:10}}/><b style={{fontSize:33,letterSpacing:'-.05em'}}>pulldot</b><span style={{flex:1}}/><span style={{fontSize:23,color:c.mint}}>◎</span><span style={{background:c.raised,padding:9,borderRadius:10}}><Icon kind="info" size={21}/></span><span style={{background:c.raised,padding:9,borderRadius:10,fontSize:20,lineHeight:'21px',color:c.muted}}>☷</span></div>
     <div style={{marginTop:20,fontSize:18,fontWeight:650,color:c.muted}}>Video or audio link</div>
     <div style={{height:58,borderRadius:13,background:'#151d1d',border:`1.5px solid ${f>35?c.mint:c.edge}`,marginTop:12,display:'flex',alignItems:'center',padding:'0 16px',fontSize:20,whiteSpace:'nowrap',overflow:'hidden',boxShadow:f>35&&f<100?'0 0 0 3px #89e5c119':'none'}}>{f<35?<span style={{color:'#85948d'}}>Paste a link here…</span>:<>{shown}<span style={{color:c.mint,opacity:f<79&&Math.floor(f/8)%2===0?1:0}}>|</span></>}</div>
     <div style={{fontSize:15,color:c.muted,marginTop:11}}>YouTube · Instagram · TikTok · Reddit · X · Vimeo</div>
     {f>=78&&f<99?<div style={{position:'absolute',top:258,left:34,color:c.mint,fontSize:17}}>Identifying media…</div>:null}
     <div style={{height:111,marginTop:15,...card(),padding:11,boxSizing:'border-box',display:'flex',gap:17,alignItems:'center',opacity:tween(f,96,109),transform:`translateY(${tween(f,96,109,12,0)}px)`}}><Thumb/><div><div style={{fontSize:23,fontWeight:730}}>Coastal Light</div><div style={{fontSize:16,color:c.muted,marginTop:8}}>Vimeo · 03:42</div><div style={{fontSize:12,fontWeight:800,color:c.mint,marginTop:14,letterSpacing:'.1em'}}>MEDIA FOUND</div></div></div>
     <div style={{opacity:tween(f,99,111)}}>
      <div style={{marginTop:16,fontSize:18,fontWeight:650,color:c.muted}}>Format</div>
      <div style={{display:'flex',gap:14,marginTop:12}}><div style={{width:250,height:67,...card(true),display:'flex',alignItems:'center',gap:14,padding:'0 17px',boxSizing:'border-box'}}><Icon kind="video" color={c.mint}/><div><b style={{fontSize:19,color:c.mint}}>Video</b><div style={{fontSize:15,color:'#91b7a7'}}>MP4</div></div></div><div style={{width:250,height:67,...card(),display:'flex',alignItems:'center',gap:14,padding:'0 17px',boxSizing:'border-box'}}><Icon kind="audio"/><div><b style={{fontSize:19,color:c.muted}}>Audio</b><div style={{fontSize:15,color:'#75827e'}}>MP3</div></div></div></div>
      <div style={{marginTop:16,fontSize:18,fontWeight:650,color:c.muted}}>Quality <span style={{fontSize:14,fontWeight:450,marginLeft:8}}>Available resolutions</span></div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginTop:12}}>{[['720p','≈ 17.7 MB'],['1080p','≈ 31.6 MB'],['4K','≈ 149.6 MB'],['Original','≈ 149.6 MB']].map(([q,size],i)=><div key={q} style={{...card(i===1&&chosen),height:57,padding:'7px 15px',boxSizing:'border-box'}}><div style={{fontSize:18,fontWeight:700,color:i===1&&chosen?c.mint:c.white}}>{q}</div><div style={{fontSize:14,color:i===1&&chosen?c.mint:c.muted,marginTop:3}}>{size}</div></div>)}</div>
     </div>
     <div style={{position:'absolute',bottom:22,left:34,right:34}}><div style={{height:61,background:c.panel,borderRadius:13,display:'flex',alignItems:'center',gap:14,padding:'0 18px'}}><Icon kind="folder" color={c.mint}/><div><div style={{fontSize:13,color:c.muted}}>Save to</div><b style={{fontSize:17}}>Downloads</b></div><span style={{flex:1}}/><span style={{color:c.muted}}>⌄</span></div><div style={{height:62,marginTop:13,borderRadius:13,background:c.mint,color:'#15362a',fontSize:20,fontWeight:760,display:'flex',alignItems:'center',justifyContent:'center',gap:12,transform:f>=158&&f<168?'scale(.985)':'scale(1)',boxShadow:f>=158&&f<168?'0 0 0 6px #89e5c127':'none'}}><Icon kind="download" color="#15362a" size={23}/>Download video</div></div>
    </div>
    <div style={{flex:1,position:'relative',background:c.shell}}>
     <div style={{height:143,borderBottom:`1px solid ${c.edge}`,padding:'28px 45px 0',boxSizing:'border-box'}}><div style={{fontSize:36,fontWeight:760,letterSpacing:'-.04em'}}>Downloads</div><div style={{fontSize:16,color:c.muted,marginTop:4}}>{done?'Saved to your Mac.':downloading?'One download in progress.':'All caught up.'}</div><div style={{display:'flex',gap:42,marginTop:26,fontSize:18}}><span style={{height:37,borderBottom:`3px solid ${c.mint}`,fontWeight:650}}>In progress <small style={{background:c.raised,padding:'3px 8px',borderRadius:6,marginLeft:7}}>{downloading&&!done?1:0}</small></span><span style={{color:c.muted}}>History <small style={{background:c.raised,padding:'3px 8px',borderRadius:6,marginLeft:7}}>{done?1:0}</small></span></div></div>
     {!downloading?<div style={{position:'absolute',top:320,left:73,opacity:tween(f,160,168,1,0)}}><Icon kind="download" size={50} color={c.mint}/><div style={{fontSize:30,fontWeight:700,marginTop:24}}>Ready for the next download.</div><div style={{fontSize:19,lineHeight:1.55,color:c.muted,marginTop:14}}>Paste a link, pick a quality,<br/>and save it to your Mac.</div></div>:<div style={{margin:44,padding:27,borderRadius:19,background:c.panel,border:`1px solid ${c.edge}`,opacity:tween(f,166,178),transform:`translateY(${tween(f,166,178,20,0)}px)`}}><div style={{display:'flex',gap:20,alignItems:'center'}}><Thumb/><div style={{flex:1}}><div style={{fontSize:24,fontWeight:720}}>Coastal Light.mp4</div><div style={{fontSize:16,color:c.muted,marginTop:8}}>Vimeo · MP4 · 1080p</div><div style={{fontSize:16,color:done?c.mint:c.muted,marginTop:14}}>{done?'Download complete · 31.6 MB':`${transferred} of 31.6 MB · ${progress<20?'5.2':progress<70?'8.4':'6.1'} MB/s · ${Math.max(1,Math.round((100-progress)*.06))}s left`}</div></div><div style={{fontSize:32,fontWeight:760,color:done?c.mint:c.white}}>{done?<Icon kind="check" color={c.mint} size={34}/>: `${progress}%`}</div></div><div style={{height:11,borderRadius:10,background:'#38423f',marginTop:26,overflow:'hidden'}}><div style={{width:`${progress}%`,height:'100%',borderRadius:10,background:c.mint,boxShadow:'0 0 18px #89e5c155'}}/></div><div style={{display:'flex',justifyContent:'space-between',marginTop:18,fontSize:15,color:c.muted}}><span>{done?'Ready to open in Finder':'Downloading…'}</span><span style={{display:'flex',alignItems:'center',gap:7}}><Icon kind="folder" size={18}/>Show in Finder</span></div></div>}
    </div>
   </div>
   <div style={{height:47,borderTop:`1px solid ${c.edge}`,background:c.side,display:'flex',alignItems:'center',padding:'0 34px',fontSize:14,color:c.muted}}>Pulldot 0.3.0 <span style={{margin:'0 16px'}}>·</span> MIT License <span style={{flex:1}}/>Made by Evaldo</div>
  </div>
  {f>=112&&f<180?<div style={{position:'absolute',left:164+mouseX2,top:131+mouseY2,opacity:Math.min(tween(f,112,119),tween(f,173,180,1,0)),filter:'drop-shadow(0 3px 4px #0009)',transform:'rotate(-15deg)'}}><svg width="30" height="38" viewBox="0 0 30 38"><path d="M2 2v29l7-7 5 11 5-2-5-11h10z" fill="white" stroke="#18201e" strokeWidth="2"/></svg></div>:null}
  <div style={{position:'absolute',bottom:19,left:164,fontSize:15,color:'#95a6a0',opacity:appOpacity}}>Simulated product walkthrough</div><div style={{position:'absolute',bottom:19,right:164,fontSize:15,color:'#95a6a0',opacity:appOpacity}}>pulldot · macOS</div>
 </AbsoluteFill>;
}
export const RemotionRoot=()=> <Composition id="PulldotDemo" component={Demo} durationInFrames={360} fps={30} width={1920} height={1080}/>;
