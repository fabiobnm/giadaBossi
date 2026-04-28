"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useTheme } from "../context/ThemeContext";
import type { Commercial } from "@/lib/queries/commercials";
import type { Narrative } from "@/lib/queries/narratives";

type Props = {
  commercials: Commercial[];
  narratives: Narrative[];
};

export default function Header({ commercials, narratives }: Props) {
  const [menuUp, setMenuUp] = useState(false);
  const router = useRouter();
  const [darkUp, setDarkUp] = useState(false);
  const [leftUp, setLeftkUp] = useState(false);
  const { dark, toggleDark } = useTheme();
  const { left, toggleLeft } = useTheme();

  const pathname = usePathname();
  const isAbout = pathname === "/about";
const isWork = pathname.startsWith("/work/");
const isHome = pathname === "/";
const currentSlug = pathname.split("/").pop();
const isNarrative = pathname.startsWith("/work/narrative/");
const isCommercial = pathname.startsWith("/work/commercial/");

  function goHome() {
    setMenuUp(false);
    toggleDark();
    setDarkUp(false)
    setLeftkUp(false)

    setTimeout(() => {
      router.push("/");
    }, 500);
  }

  function goAbout() {
    setMenuUp(true);
    toggleDark();
    setDarkUp(true)
    setLeftkUp(false)

     const delay = isWork ? 0 : 1500;

  setTimeout(() => {
      router.push("/about");
  }, delay);

  
  }



   function goToCommercial(slug: string) {
      const isAlreadyOnWork = pathname.startsWith("/work/");

  toggleLeft();
  setDarkUp(false);
  setLeftkUp(true);

  const delay = isAlreadyOnWork ? 0 : 1500;

  setTimeout(() => {
    router.push(`/work/commercial/${slug}`);
  }, delay);
}

  function goToNarrative(slug: string) {

     const isAlreadyOnWork = pathname.startsWith("/work/");
     toggleLeft();
    setDarkUp(false)
     setLeftkUp(true)


   const delay = isAlreadyOnWork ? 0 : 1500;

  setTimeout(() => {
    router.push(`/work/narrative/${slug}`);
  }, delay);
    
  }
  return (
    <header style={{position:'relative', zIndex:99999}}>
      <div className="headerWork" style={{
          gridAutoFlow: "column",
          gridTemplateColumns:'repeat(12, 1fr)',
          position: 'fixed',
          width:'100%',
          color:'black',
           transition: "transform 1.5s ease",
           transform: (isWork)
      ? "translateX(-0vW)" : 'translateX(-50vW)',
        padding:'10px'}}>
         <a href="/" style={{
          gridColumn:'1 / span 2'
        }}>Giada Bossi</a>
        <a style={{
          gridColumn:'4 / span 1'
        }} className={isAbout ? 'opacity02' : ''}> Work</a>
        <a onClick={goAbout} style={{
          gridColumn:'5 / span 1',
          opacity: isWork ? '.2' : '1'
        }}>About</a>
      </div>
      <div className="gridHeader"
        style={{
          padding: "10px",
             transform: (isWork || leftUp)
      ? "translateX(calc(-50vW + 10px))translateY(40vH)"
      : (isAbout || darkUp)
      ? "translateY(0vh) "
      : "translateY(40vH)",
          color: (isAbout || isWork || darkUp || leftUp) ? "black" : "white",
        }}
      >
        <a onClick={goHome} style={{
          gridColumn:'1 / span 2'
        }}>Giada Bossi</a>
        <p style={{
          gridColumn:'4 / span 1'
        }} className={isAbout ? 'opacity02' : ''}> {isAbout ? <a style={{fontSize:'16px'}} href={`/work/commercial/${commercials?.[0]?.projects?.[0]?.slug || ""}`}>Work</a> : "Director"}</p>
        <a onClick={goAbout} style={{
          gridColumn:'5 / span 1',
          opacity: isWork ? '.2' : '1'
        }}>About</a>
        <div style={{
          display: (isAbout ) ? "none" : "block",
          opacity: darkUp ? '0' : '1',
          transition: 'opacity .6s ,  color .5s ease 0.8s',
           gridColumn:'7 / span 2',  height: 'fit-content',
        }} >
          <p style={{marginBottom:'20px', opacity: isNarrative ? '.2' : '1'}}>Commercial</p>
          <div className="movimento-wrapper">
         {commercials?.[0]?.projects?.map((project, index) => {
  const isActive = currentSlug === project.slug;

  return (
    <p
      key={index}
       className={(isActive && isWork) ? "movimento active" : isHome ? 'movimentoHome' : 'movimento'}
      onClick={() => goToCommercial(project.slug)}
      style={{
        cursor: "pointer",       
      }}
    >
      {project.title}
    </p>
  );
})}
        </div>
        </div>
        <div  style={{
          display: (isAbout ) ? "none" : "block",
           opacity: darkUp ? '0' : '1',
           transition: 'opacity .6s ,  color .5s ease 0.8s',
           gridColumn:'9 / span 2', height: 'fit-content'
        }}>
        <p style={{marginBottom:'20px', opacity: isCommercial ? '.2' : '1'}}>Narrative</p>
         <div className="movimento-wrapper">
        {narratives?.[0]?.projects?.map((project, index) => {
  const isActive = currentSlug === project.slug;

  return (
    <p
      key={index}
       className={(isActive && isWork) ? "movimento active" : isHome ? 'movimentoHome' : 'movimento'}
      onClick={() => goToNarrative(project.slug)}
      style={{
        cursor: "pointer",
      }}
    >
      {project.title}
    </p>
  );
})}
</div>   
        </div>
      </div>
     <div className="headerMobile" 
     style={{  transition: 'opacity .6s ,  color .5s ease 0.8s',
     color: (isAbout || isWork || darkUp || leftUp) ? "black" : "white",}}>
      <div className="headerMobileGrid">
          <a href="/" style={{
          gridColumn:'1 / span 1', whiteSpace:'nowrap',
        }}>Giada Bossi</a>
        {isHome ?   <a style={{
          gridColumn:'3 / span 1',
          textAlign:'center'
        }} className={isAbout ? 'opacity02' : ''}> Director</a> 
         : <a href={`/work/commercial/${commercials?.[0]?.projects?.[0]?.slug || ""}`}
          style={{
          gridColumn:'3 / span 1',
          textAlign:'center'
        }} className={isAbout ? 'opacity02' : ''}> Work</a> }
      
        <a onClick={goAbout} style={{
          gridColumn:'5 / span 1',
          textAlign:'right',
          opacity: isWork ? '.2' : '1'
        }}>About</a>
      </div>
             <div style={{
          display: (isAbout ) ? "none" : "block",
          opacity: darkUp ? '0' : '1',
          transition: 'opacity .6s ,  color .5s ease 0.8s',
           gridColumn:'7 / span 2',  height: 'fit-content',
           padding:'10px', marginTop:'10vH'
        }} >
          <p style={{marginBottom:'20px', opacity: isNarrative ? '.2' : '1'}}>Commercial</p>
          <div className="movimento-wrapper">
         {commercials?.[0]?.projects?.map((project, index) => {
  const isActive = currentSlug === project.slug;

  return (
    <p
      key={index}
       className={(isActive && isWork) ? "movimento active" : isHome ? 'movimentoHome' : 'movimento'}
      onClick={() => goToCommercial(project.slug)}
      style={{
        cursor: "pointer",       
      }}
    >
      {project.title}
    </p>
  );
})}
        </div>
        </div>
           <div  style={{
          display: (isAbout ) ? "none" : "block",
           opacity: darkUp ? '0' : '1',
           transition: 'opacity .6s ,  color .5s ease 0.8s',
           gridColumn:'9 / span 2', height: 'fit-content',
           padding:'10px',
           marginTop:'20px'
        }}>
        <p style={{marginBottom:'20px', opacity: isCommercial ? '.2' : '1'}}>Narrative</p>
         <div className="movimento-wrapper">
        {narratives?.[0]?.projects?.map((project, index) => {
  const isActive = currentSlug === project.slug;

  return (
    <p
      key={index}
       className={(isActive && isWork) ? "movimento active" : isHome ? 'movimentoHome' : 'movimento'}
      onClick={() => goToNarrative(project.slug)}
      style={{
        cursor: "pointer",
      }}
    >
      {project.title}
    </p>
  );
})}
</div>   
        </div>
     </div>
    </header>
  );
}