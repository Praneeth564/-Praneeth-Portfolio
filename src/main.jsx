import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Stars, Sparkles, MeshDistortMaterial, MeshTransmissionMaterial, Text, Environment, ContactShadows } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail, Menu, X, Instagram, Cpu, Bot, Code2, BrainCircuit, ExternalLink, Download, Sparkles as SparkleIcon, Atom, Orbit, Layers3, MoveUpRight } from 'lucide-react';
import * as THREE from 'three';
import './styles.css';

function Core() {
  const group = useRef();
  const core = useRef();
  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.12;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.12;
    }
    if (core.current) core.current.rotation.z -= delta * 0.18;
  });
  return (
    <group ref={group}>
      <Float speed={1.3} rotationIntensity={0.3} floatIntensity={0.4}>
        <mesh ref={core}>
          <icosahedronGeometry args={[1.02, 2]} />
          <MeshDistortMaterial color="#4bdcf4" roughness={0.12} metalness={0.75} distort={0.32} speed={2.4} emissive="#062b4a" emissiveIntensity={0.8} />
        </mesh>
        <mesh scale={1.23}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial color="#9c8cff" wireframe transparent opacity={0.42} />
        </mesh>
      </Float>
      {[1.75, 2.05, 2.35].map((r, i) => (
        <mesh key={r} rotation={[0.7 + i * 0.55, i * 0.8, 0.35]}>
          <torusGeometry args={[r, 0.008, 8, 180]} />
          <meshBasicMaterial color={i === 1 ? '#8f82ff' : '#4bdcf4'} transparent opacity={0.65} />
        </mesh>
      ))}
      {Array.from({ length: 7 }).map((_, i) => {
        const a = (i / 7) * Math.PI * 2;
        const r = 2.28;
        return <Float key={i} speed={1 + i * .12} floatIntensity={.55}>
          <mesh position={[Math.cos(a) * r, Math.sin(a * 1.6) * .65, Math.sin(a) * r]}>
            <octahedronGeometry args={[.11 + (i % 2) * .04, 0]} />
            <meshStandardMaterial color={i % 2 ? '#a28bff' : '#63e7ff'} emissive={i % 2 ? '#35256d' : '#0a4c66'} emissiveIntensity={1.4} metalness={.7} roughness={.2} />
          </mesh>
        </Float>;
      })}
    </group>
  );
}

function DataOrbit() {
  const ref = useRef();
  useFrame((state, delta) => { if (ref.current) ref.current.rotation.y += delta * .045; });
  return <group ref={ref}>
    {Array.from({ length: 90 }).map((_, i) => {
      const a = i * 2.399;
      const r = 3.3 + (i % 11) * .11;
      const y = ((i % 17) - 8) * .13;
      return <mesh key={i} position={[Math.cos(a) * r, y, Math.sin(a) * r]}>
        <sphereGeometry args={[.018 + (i % 3) * .008, 8, 8]} />
        <meshBasicMaterial color={i % 4 === 0 ? '#b49aff' : '#64dff4'} transparent opacity={.7} />
      </mesh>;
    })}
  </group>;
}

function HeroScene() {
  return <Canvas camera={{ position: [0, 0, 8], fov: 38 }} dpr={[1, 1.6]} gl={{ antialias: true, alpha: true }}>
    <color attach="background" args={['#070b14']} />
    <fog attach="fog" args={['#070b14', 9, 18]} />
    <ambientLight intensity={.6} />
    <pointLight position={[4, 5, 5]} intensity={60} color="#58dfff" />
    <pointLight position={[-5, -3, 2]} intensity={45} color="#866bff" />
    <Stars radius={80} depth={45} count={2600} factor={3.2} saturation={.3} fade speed={.5} />
    <Sparkles count={85} scale={8} size={2.1} speed={.25} opacity={.65} color="#9deaff" />
    <DataOrbit />
    <Core />
    <ContactShadows position={[0, -3.2, 0]} opacity={.28} scale={9} blur={3} far={5} />
    <Environment preset="city" />
    <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={.35} minPolarAngle={Math.PI / 2.8} maxPolarAngle={Math.PI / 1.7} />
  </Canvas>;
}

const projects = [
  { number:'01', type:'COMPUTER VISION · DEEP LEARNING', title:'Sports Shoe Condition Analysis', description:'A multi-task computer vision pipeline designed to identify shoe type, wear severity, colour fading, heel wear and sole damage from images.', tags:['Python','TensorFlow / Keras','CNNs','Grad-CAM'], accent:'cyan', link:'https://github.com/Praneeth564/Shoe_Classifier-DL-' },
  { number:'02', type:'ROBOTICS · COVERAGE PLANNING', title:'Cleaning Robot Coverage', description:'An autonomous cleaning-robot project focused on systematic area coverage and navigation. Explore the implementation and project details on GitHub.', tags:['Robotics','Coverage Planning','Algorithms'], accent:'violet', link:'https://github.com/Praneeth564/CleaningRobotCoverage' },
];
const skillGroups = [
  { icon:BrainCircuit, title:'AI & Machine Learning', items:['Machine Learning','Deep Learning','CNN Architectures','Computer Vision','Model Evaluation'] },
  { icon:Code2, title:'Programming & Tools', items:['Python','C','JavaScript','Git & GitHub','VS Code','Google Colab'] },
  { icon:Bot, title:'Robotics & IoT', items:['Robot Fundamentals','Arduino','Sensors & Actuators','Embedded Systems','IoT Prototyping'] },
  { icon:Cpu, title:'Libraries & Frameworks', items:['TensorFlow / Keras','PyTorch','OpenCV','NumPy','Pandas','Scikit-learn'] }
];
const socials = [
  { label:'Instagram', href:'https://www.instagram.com/praneeth_564/', Icon:Instagram, handle:'@praneeth_564' },
  { label:'LinkedIn', href:'https://www.linkedin.com/in/n-praneeth-683260341/', Icon:Linkedin, handle:'Professional profile' },
  { label:'GitHub', href:'https://github.com/Praneeth564', Icon:Github, handle:'@Praneeth564' },
  { label:'Email', href:'mailto:nichanametlapraneeth@gmail.com', Icon:Mail, handle:'Let’s talk' }
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showCleaningCaseStudy, setShowCleaningCaseStudy] = useState(false);
  const { scrollYProgress } = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const closeMenu = () => setMenuOpen(false);
  const nav = [['About','#about'],['Skills','#skills'],['Projects','#projects'],['Connect','#contact']];
  return <div className="app-shell">
    <motion.div className="reading-progress" style={{ scaleX: progressScale }} />
    <div className="noise" />
    <header className="topbar">
      <a className="brand" href="#home" onClick={closeMenu}><span className="brand-mark">P<span>.</span></span><span>PRANEETH</span></a>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X/> : <Menu/>}</button>
      <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>{nav.map(([label,href])=><a key={label} href={href} onClick={closeMenu}>{label}</a>)}<a className="nav-resume" href="/Praneeth-Resume.pdf" target="_blank" rel="noreferrer"><Download size={14}/> Resume</a><a className="nav-cta" href="#contact" onClick={closeMenu}>Let’s connect <ArrowUpRight size={15}/></a></nav>
    </header>

    <main>
      <section className="hero section-wrap" id="home">
        <div className="hero-copy">
          <div className="eyebrow"><span className="status-dot"/> OPEN TO OPPORTUNITIES <span className="eyebrow-divider"/> BENGALURU, INDIA</div>
          <p className="hero-kicker">AI & ROBOTICS · BUILDER · PROBLEM SOLVER</p>
          <h1>Engineering<br/>the <span className="gradient-text">next</span><br/>possibility<span className="period">.</span></h1>
          <p className="hero-description">I’m Praneeth — an Artificial Intelligence & Robotics student turning curiosity into intelligent software, computer vision experiments and real-world robotic systems.</p>
          <div className="hero-actions"><a className="button button-primary" href="#projects">Explore my work <ArrowUpRight size={17}/></a><a className="button button-ghost" href="#contact">Let’s connect</a></div>
          <div className="hero-meta"><span><b>01</b> / AI & ROBOTICS</span><span className="meta-line"/><span>LEARN · BUILD · ITERATE</span></div>
        </div>
        <div className="hero-stage">
          <div className="scene-halo"/>
          <div className="scene-frame"><HeroScene/><div className="scene-label"><span className="scene-pulse"/> LIVE 3D SYSTEM <span>DRAG TO ORBIT</span></div></div>
          <div className="hud hud-top"><span>CORE / 001</span><span className="hud-live">● ONLINE</span></div>
          <div className="hud hud-bottom"><span>NEURAL INTERFACE</span><span>ROTATE · EXPLORE · DISCOVER</span></div>
          <div className="float-chip chip-ai"><BrainCircuit size={15}/> AI / ML</div>
          <div className="float-chip chip-robot"><Bot size={15}/> ROBOTICS</div>
          <div className="stage-crosshair">+</div>
        </div>
        <a className="scroll-cue" href="#about"><span>SCROLL TO EXPLORE</span><ArrowDown size={15}/></a>
      </section>

      <section className="ticker"><div className="ticker-track"><span>ARTIFICIAL INTELLIGENCE</span><i>✳</i><span>ROBOTICS</span><i>✳</i><span>COMPUTER VISION</span><i>✳</i><span>INNOVATION</span><i>✳</i><span>ARTIFICIAL INTELLIGENCE</span><i>✳</i><span>ROBOTICS</span></div></section>

      <section className="section-wrap content-section about-section" id="about">
        <div className="section-heading"><span className="section-number">01 / ABOUT ME</span><span className="section-rule"/></div>
        <div className="about-grid">
          <div className="portrait-column">
            <div className="portrait-frame"><div className="portrait-glow"/><img src="/profile.jpg" alt="Praneeth portrait"/><span className="portrait-corner portrait-corner-a"/><span className="portrait-corner portrait-corner-b"/><div className="portrait-caption"><span>PRANEETH / PROFILE</span><span>AI & ROBOTICS STUDENT</span></div></div>
            <div className="portrait-socials">
              <span className="portrait-social-label">FIND ME AROUND THE WEB</span>
              <div className="portrait-social-links">
                <a href="https://www.instagram.com/praneeth_564/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={18}/><span>Instagram</span><ArrowUpRight size={13}/></a>
                <a href="https://www.linkedin.com/in/n-praneeth-683260341/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18}/><span>LinkedIn</span><ArrowUpRight size={13}/></a>
                <a href="https://github.com/Praneeth564" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18}/><span>GitHub</span><ArrowUpRight size={13}/></a>
                <a href="mailto:nichanametlapraneeth@gmail.com" aria-label="Email"><Mail size={18}/><span>Email</span><ArrowUpRight size={13}/></a>
              </div>
            </div>
          </div>
          <div className="about-text"><p className="overline">A LITTLE ABOUT ME</p><h2>Curiosity is my<br/><span className="muted-heading">starting point.</span></h2>
            <p>I’m Praneeth, a B.Tech student in <strong>Artificial Intelligence & Robotics</strong> at Dayananda Sagar University. I enjoy turning technical concepts into practical experiments — from training deep-learning models to building sensor-driven systems and exploring autonomous robotics.</p>
            <p>I’m continuously learning, building and looking for opportunities to collaborate, contribute and grow as an engineer.</p>
            <div className="education-card"><div className="edu-icon"><Cpu size={20}/></div><div><span className="overline">EDUCATION</span><strong>B.Tech — Artificial Intelligence & Robotics</strong><small>Dayananda Sagar University · Bengaluru, India</small></div><span className="edu-year">UNDERGRADUATE</span></div>
            <div className="resume-actions">
              <a className="button button-primary" href="/Praneeth-Resume.pdf" target="_blank" rel="noreferrer">View Resume <ExternalLink size={15}/></a>
              <a className="button button-ghost" href="/Praneeth-Resume.pdf" download="Praneeth-Resume.pdf"><Download size={15}/> Download PDF</a>
            </div>
            <div className="about-values"><span><Atom size={16}/> EXPERIMENTAL MINDSET</span><span><Orbit size={16}/> SYSTEMS THINKING</span></div>
          </div>
        </div>
      </section>

      <section className="section-wrap content-section skills-section" id="skills">
        <div className="section-heading"><span className="section-number">02 / CAPABILITIES</span><span className="section-rule"/></div>
        <div className="section-title-row"><div><p className="overline">MY TECHNICAL TOOLKIT</p><h2>Built to <span className="gradient-text">explore.</span></h2></div><p className="section-side-note">A growing toolkit for solving<br/>problems across software and hardware.</p></div>
        <div className="skills-grid">{skillGroups.map((group,i)=>{const Icon=group.icon;return <motion.div className="skill-card" key={group.title} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.08}}><div className="skill-card-top"><Icon size={22}/><span>0{i+1}</span></div><h3>{group.title}</h3><div className="skill-tags">{group.items.map(item=><span key={item}>{item}</span>)}</div><div className="card-sheen"/></motion.div>})}</div>
      </section>

      <section className="section-wrap content-section projects-section" id="projects">
        <div className="section-heading"><span className="section-number">03 / SELECTED WORK</span><span className="section-rule"/></div>
        <div className="section-title-row"><div><p className="overline">THINGS I’VE BUILT & EXPLORED</p><h2>Ideas in <span className="gradient-text">motion.</span></h2></div><p className="section-side-note">Experiments across AI,<br/>robotics and connected systems.</p></div>
        <div className="projects-list">{projects.map((p,i)=><motion.a className={`project-card ${p.accent}`} key={p.number} href={p.link} target="_blank" rel="noreferrer" aria-label={`Open ${p.title} GitHub repository`} initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.5,delay:i*.07}}>
          <div className="project-number">{p.number}</div><div className="project-main"><span className="project-type">{p.type}</span><h3>{p.title}</h3><p>{p.description}</p><div className="project-tags">{p.tags.map(tag=><span key={tag}>{tag}</span>)}</div></div><span className="project-link" aria-hidden="true"><ArrowUpRight/></span><div className="project-watermark">{p.number}</div>
        </motion.a>)}</div>
        <p className="project-footnote">More experiments and builds in progress. <SparkleIcon size={14}/></p>
        <button type="button" className="case-study-cta" onClick={() => setShowCleaningCaseStudy((visible) => !visible)}>{showCleaningCaseStudy ? "Hide the Cleaning Robot case study" : "Explore the Cleaning Robot case study"} <ArrowUpRight size={15}/></button>
      </section>

      {showCleaningCaseStudy && (
        <section className="section-wrap content-section robot-case-section" id="cleaning-robot-case-study">
        <div className="section-heading"><span className="section-number">PROJECT DEEP DIVE / 02</span><span className="section-rule"/></div>
        <div className="section-title-row"><div><p className="overline">ENGINEERING CASE STUDY</p><h2>Cleaning robot<br/><span className="gradient-text">coverage system.</span></h2></div><a className="button button-primary" href="https://github.com/Praneeth564/CleaningRobotCoverage" target="_blank" rel="noreferrer"><Github size={16}/> View source code <ArrowUpRight size={15}/></a></div>
        <p className="robot-case-intro">A simulation-based comparison of three autonomous floor-cleaning strategies across five room layouts with obstacles, battery reserve and an auto-docking / recharge mechanism.</p>
        <div className="robot-case-facts">
          <div><span>01</span><strong>5</strong><small>ROOM LAYOUTS</small></div>
          <div><span>02</span><strong>3</strong><small>CLEANING STRATEGIES</small></div>
          <div><span>03</span><strong>22%</strong><small>BATTERY RESERVE</small></div>
          <div><span>04</span><strong>4%</strong><small>CHARGE / FRAME</small></div>
        </div>
        <div className="robot-case-subhead"><div><p className="overline">THE APPROACH</p><h3>One room. Three strategies.</h3></div><p>The same room matrix is used to compare Sweep, Spiral + BFS and Random Bounce. Furniture blocks movement, the dock supports recharging, and the simulation tracks cleaning coverage and robot movement.</p></div>
        <div className="strategy-grid">
          <article><span className="strategy-index">STRATEGY 01</span><h4>Sweep</h4><p>Systematic back-and-forth passes across the room, producing an organized coverage pattern.</p></article>
          <article><span className="strategy-index">STRATEGY 02</span><h4>Spiral + BFS</h4><p>Combines spiral-style movement with breadth-first search to navigate reachable floor cells around obstacles.</p></article>
          <article><span className="strategy-index">STRATEGY 03</span><h4>Random Bounce</h4><p>Uses bounce-like movement. The supplied runs show more variation in coverage and repeated movement.</p></article>
        </div>
        <div className="robot-case-subhead"><div><p className="overline">MEASURED RESULTS</p><h3>Simulation performance</h3></div><p>Values below are transcribed from your terminal and dashboard screenshots. They are simulation outputs, not physical robot test measurements.</p></div>
        <div className="results-wrap">
          <div className="results-heading"><strong>Layout 1</strong><span>Three-strategy comparison</span></div>
          <div className="results-table">
            <div className="results-row results-header"><span>Strategy</span><span>Coverage</span><span>Path steps</span><span>Turns</span><span>Uncleaned</span><span>Dock cycles</span></div>
            <div className="results-row"><b>Sweep</b><strong>100.00%</strong><span>1,246</span><span>126</span><span>0</span><span>2</span></div>
            <div className="results-row"><b>Spiral + BFS</b><strong>100.00%</strong><span>750</span><span>64</span><span>0</span><span>1</span></div>
            <div className="results-row"><b>Random Bounce</b><strong>64.86%</strong><span>1,382</span><span>927</span><span>317</span><span>2</span></div>
          </div>
          <div className="results-heading second-results"><strong>Layout 2</strong><span>Three-strategy comparison</span></div>
          <div className="results-table">
            <div className="results-row results-header"><span>Strategy</span><span>Coverage</span><span>Path steps</span><span>Turns</span><span>Uncleaned</span><span>Dock cycles</span></div>
            <div className="results-row"><b>Sweep</b><strong>100.00%</strong><span>1,526</span><span>168</span><span>0</span><span>3</span></div>
            <div className="results-row"><b>Spiral + BFS</b><strong>100.00%</strong><span>910</span><span>77</span><span>0</span><span>2</span></div>
            <div className="results-row"><b>Random Bounce</b><strong>97.19%</strong><span>1,610</span><span>886</span><span>25</span><span>4</span></div>
          </div>
          <div className="results-heading second-results"><strong>Layout 3</strong><span>Dashboard-reported values</span></div>
          <div className="results-table">
            <div className="results-row results-header"><span>Strategy</span><span>Coverage</span><span>Path steps</span><span>Turns</span><span>Repeated cells</span><span>Dock cycles</span></div>
            <div className="results-row"><b>Sweep</b><strong>100.00%</strong><span>1,258</span><span>127</span><span>938</span><span>2</span></div>
            <div className="results-row"><b>Spiral + BFS</b><strong>100.00%</strong><span>890</span><span>81</span><span>933</span><span>2</span></div>
            <div className="results-row"><b>Random Bounce</b><strong>47.70%</strong><span>1,436</span><span>917</span><span>420</span><span>2</span></div>
          </div>
          <div className="results-heading second-results"><strong>Layout 5</strong><span>Terminal-reported values</span></div>
          <div className="results-table">
            <div className="results-row results-header"><span>Strategy</span><span>Coverage</span><span>Path steps</span><span>Turns</span><span>Uncleaned</span><span>Dock cycles</span></div>
            <div className="results-row"><b>Sweep</b><strong>85.94%</strong><span>1,334</span><span>123</span><span>117</span><span>2</span></div>
            <div className="results-row"><b>Spiral + BFS</b><strong>85.94%</strong><span>686</span><span>39</span><span>117</span><span>1</span></div>
            <div className="results-row"><b>Random Bounce</b><strong>43.99%</strong><span>1,396</span><span>870</span><span>466</span><span>2</span></div>
          </div>
          <p className="results-note">Repeated cells = distinct floor cells cleaned at least twice. Layout 3 repeated-cell count is taken from the dashboard; other columns are as shown in that same dashboard. Layout 4 is included in the room-layout overview, but no strategy result screenshot was supplied for it.</p>
        </div>
        <div className="insight-strip"><div><span>KEY OBSERVATION</span><strong>Spiral + BFS used fewer path steps than Sweep in every supplied layout comparison.</strong></div><p>It matched Sweep's coverage in layouts 1–3, and matched its 85.94% coverage in layout 5, while using fewer path steps in each of those runs.</p></div>
        <div className="robot-case-subhead gallery-heading"><div><p className="overline">SIMULATION EVIDENCE</p><h3>Your actual project screenshots</h3></div><p>Select any image to open it at full size.</p></div>
        <div className="robot-gallery">
          <a href="/cleaning-robot/layouts-overview.png" target="_blank" rel="noreferrer" className="robot-gallery-item gallery-wide"><img src="/cleaning-robot/layouts-overview.png" alt="Five room layouts used in the cleaning robot simulation"/><span>Five room layouts</span></a>
          <a href="/cleaning-robot/layout-1-comparison.png" target="_blank" rel="noreferrer" className="robot-gallery-item"><img src="/cleaning-robot/layout-1-comparison.png" alt="Cleaning strategy comparison for room layout 1"/><span>Layout 1 — strategy comparison</span></a>
          <a href="/cleaning-robot/layout-1-terminal-results.png" target="_blank" rel="noreferrer" className="robot-gallery-item"><img src="/cleaning-robot/layout-1-terminal-results.png" alt="Terminal metrics for room layout 1"/><span>Layout 1 — terminal metrics</span></a>
          <a href="/cleaning-robot/layout-2-comparison.png" target="_blank" rel="noreferrer" className="robot-gallery-item"><img src="/cleaning-robot/layout-2-comparison.png" alt="Cleaning strategy comparison for room layout 2"/><span>Layout 2 — strategy comparison</span></a>
          <a href="/cleaning-robot/layout-2-terminal-results.png" target="_blank" rel="noreferrer" className="robot-gallery-item"><img src="/cleaning-robot/layout-2-terminal-results.png" alt="Terminal metrics for room layout 2"/><span>Layout 2 — terminal metrics</span></a>
          <a href="/cleaning-robot/layout-3-comparison.png" target="_blank" rel="noreferrer" className="robot-gallery-item"><img src="/cleaning-robot/layout-3-comparison.png" alt="Cleaning strategy comparison for room layout 3"/><span>Layout 3 — strategy comparison</span></a>
          <a href="/cleaning-robot/layout-3-terminal-results.png" target="_blank" rel="noreferrer" className="robot-gallery-item"><img src="/cleaning-robot/layout-3-terminal-results.png" alt="Terminal metrics for room layout 3"/><span>Layout 3 — terminal metrics</span></a>

        </div>
        <div className="robot-case-footer"><div><span className="overline">EXPLORE THE IMPLEMENTATION</span><h3>See the code on GitHub.</h3></div><a className="button button-primary" href="https://github.com/Praneeth564/CleaningRobotCoverage" target="_blank" rel="noreferrer"><Github size={16}/> CleaningRobotCoverage <ArrowUpRight size={15}/></a></div>
      </section>
      )}

      <section className="section-wrap content-section approach-section">
        <div className="section-heading"><span className="section-number">04 / MY APPROACH</span><span className="section-rule"/></div>
        <div className="approach-grid"><h2>Think deeply.<br/><span className="gradient-text">Build boldly.</span><br/>Improve always.</h2><div className="approach-points"><div><span>01</span><p><strong>Understand the problem</strong><br/>Start with the why before choosing the technology.</p></div><div><span>02</span><p><strong>Prototype and experiment</strong><br/>Turn ideas into testable, working systems.</p></div><div><span>03</span><p><strong>Measure and improve</strong><br/>Learn from results and make the next version better.</p></div></div></div>
      </section>

      <section className="contact-section" id="contact"><div className="section-wrap contact-inner"><div className="section-heading"><span className="section-number">05 / CONNECT</span><span className="section-rule"/></div><p className="overline">HAVE AN IDEA, PROJECT OR OPPORTUNITY?</p><h2>Let’s build<br/><span className="gradient-text">what’s next.</span></h2><a className="contact-email" href="mailto:nichanametlapraneeth@gmail.com">nichanametlapraneeth@gmail.com <ArrowUpRight/></a>
        <div className="social-grid">{socials.map(({label,href,Icon,handle})=><a className="social-card" href={href} key={label} target={label==='Email'?'_self':'_blank'} rel="noreferrer"><span className="social-icon"><Icon size={21}/></span><span className="social-copy"><strong>{label}</strong><small>{handle}</small></span><MoveUpRight size={17} className="social-arrow"/></a>)}</div>
        <div className="contact-bottom"><p>Open to learning, collaboration, internships<br/>and interesting engineering challenges.</p><span className="contact-note">LET’S CREATE SOMETHING MEANINGFUL.</span></div>
      </div></section>
    </main>
    <footer className="footer"><div className="section-wrap"><a className="brand" href="#home"><span className="brand-mark">P<span>.</span></span><span>PRANEETH</span></a><span>DESIGNED & BUILT WITH CURIOSITY © {new Date().getFullYear()}</span><a href="#home">BACK TO TOP ↑</a></div></footer>
  </div>;
}
createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
