
import React, { useRef, useEffect, useState, Suspense } from 'react';
import Tone from 'tone';
import A1 from '../../audio/A1.mp3'

const Spline = React.lazy(() => import('@splinetool/react-spline'));

export default function App() {
  const { Sampler } = Tone;

  const [isLoaded, setLoaded] = useState(false);
  const sampler = useRef(null);

   
useEffect(() => {
    sampler.current = new Sampler(
      { A1 },
      {
        onload: () => {
          setLoaded(true);
        }
      }
  ).toDestination();
  
  }, []);


  const cube = useRef();
  
  function onLoad(spline) {

    const obj = spline.findObjectById('fd2c9efa-d5aa-469e-aae9-e5b1a24b9efe');
    cube.current = obj;

    
  }
  console.log(cube)

  function moveObj() {
    console.log(cube.current.position);
    cube.current.position.x += 0;
  }

  function onHover(obj) {
    console.log(obj);
  }

  function onClick(obj) {
    console.log(obj);
    sampler.current.triggerAttack("A1");

  }

  return (
      <div className='z-50'>
          <Suspense fallback={<div>Loading...</div>}>
          <Spline scene="https://prod.spline.design/mJiC0zp9x2Fw4gAe/scene.splinecode" onLoad={onLoad} onMouseHover={onHover} onMouseDown={onClick} />
        </Suspense>
      </div>
    );
}
