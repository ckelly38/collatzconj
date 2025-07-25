import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import NumTimesTwoPowerComp from './NumTimesTwoPowerComp';
import commonclass from './commonclass';
function App() {
  let [mynum, setMyNum] = useState(1);
  let [mypow, setMyPow] = useState(1);
  let [errmsg, setErrorMessage] = useState("");
  //let [myxvals, setMyXVals] = useState([]);
  const cc = new commonclass();
  //function addVal(mval)
  //{
  //  let mnxvals = myxvals.map((mxval) => mxval);
  //  mnxvals.push(mval);
  //  setMyXVals(mnxvals);
  //}
  /*
  on the power we do:
  mynum*2^1 or just mynum*2=computed_value
  if the computed_value - 1 is divisible by 3 we say computed value - 1 = 3x x=(computed_value - 1)/3
  if not we just move on to the next one and do not display the computed values
  we repeat this until mypow value is reached and include it
  */
 /*<header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>*/
  let mynumpowsarr = [];
  for (let i = 1; i < mypow + 1; i++) mynumpowsarr.push(i);
  console.log("APP: mypow = ", mypow);
  console.log("APP: mynum = ", mynum);
  console.log("APP: mynumpowsarr = ", mynumpowsarr);
  
  const useoneline = true;
  const finuseoneline = (useoneline && mynum < 101);
  const blckstr = (finuseoneline ? "inline-" : "") + "block";
  const mypowcomps = mynumpowsarr.map((pnum) => <NumTimesTwoPowerComp key={"row" + pnum} mynum={mynum}
    mypow={mypow} oneline={finuseoneline} cpow={pnum} />);// addVal={addVal}
  const mypowvalsminusone = mynumpowsarr.map((pnum) => mynum*Math.pow(2, pnum) - 1);
  const mypowvalsdivbyt = mypowvalsminusone.map((mval) => cc.valIsDivisibleByThree(mval));
  const myxvals = mypowvalsminusone.filter((pval, pindx) => mypowvalsdivbyt[pindx])
    .map((mpval) => mpval/3);
  let fstpwindx = -1;
  for (let i = 0; i < mypowvalsdivbyt.length; i++)
  {
    if (mypowvalsdivbyt[i])
    {
      fstpwindx = i;
      break;
    }
  }
  const minpnum = mynumpowsarr[fstpwindx];
  const finxval = minpnum - 2; 
  let myfinelems = [];
  const ismynuminvalid = (mynum % 2 === 0 || mynum % 3 === 0);
  if (ismynuminvalid);
  else
  {
    if (finuseoneline)
    {
      for (let i = 0; i < mynumpowsarr.length; i++)
      {
        myfinelems.push(mypowcomps[i]);
        if (i + 1 < mynumpowsarr.length)
        {
          myfinelems.push(<div key={"cmadiv" + (i + 1)} id={"cmadiv" + (i + 1)}
            style={{display: blckstr, width: "5px"}}>{", "}</div>);
        }
      }
    }
    else myfinelems = mypowcomps;
  }
  console.log("APP: useoneline = ", useoneline);
  console.log("APP: finuseoneline = ", finuseoneline);
  console.log("APP: blckstr = ", blckstr);
  console.log("APP: ismynuminvalid = ", ismynuminvalid);
  console.log("APP: errmsg = ", errmsg);
  console.log("APP: fstpwindx = ", fstpwindx);
  console.log("APP: myxvals = ", myxvals);

  //want the x vals that converge... so we can tell the user so x, y, z, ... converges...
  //then we want to display the pattern Sn - (Sn-1) = x * 2 ^ (2n+or-0 or 1 or 2)
  //we can also indicate that the first x number will go to the mynum...
  //we could also display the collatz chain for the number
  return (
    <div className="App">
      <label for="mynum" name="mynumlbl">My odd number:</label>
      <input id="mynum" name="mynum" type="number" min={1} step={2} value={mynum}
        onChange={(event) => setMyNum(Number(event.target.value))}
        onBlur={(event) => {
          let tmpval = event.target.value;
          if (tmpval % 2 === 0) setErrorMessage("the number must be odd!");
          else {
            if (cc.valIsDivisibleByThree(tmpval))
            {
              setErrorMessage("the number must not be divisible by three!");
            }
            else
            {
              setErrorMessage("");
              setMyNum(Number(tmpval));
            }
          }}}
          placeholder="enter an odd integer" />
      <label for="mypower" name="mypowerlbl">My power number:</label>
      <input id="mypower" name="mypower" type="number" min={1} step={1} value={mypow}
        onChange={(event) => setMyPow(Number(event.target.value))}
        placeholder="enter an integer power" />
      {(cc.isVarEmptyOrNull(errmsg) ? <div style={{blckstr}}>
        {myfinelems}</div>: <p style={{color: "red"}}>{errmsg}</p>)}
      <div>So {myxvals.join(", ")} ... converges.</div>
      {((cc.isVarEmptyOrNull(myxvals) || myxvals.length < 2) ? <></>:
      <div>{myxvals[1]} - {myxvals[0]} = {myxvals[1]-myxvals[0]} = {mynum}*2^(2n+x)</div>)}
      <div>2n + x = {minpnum}, n = 1, 2 + x={minpnum}, x={finxval}</div>
      <div>{mynum}*2^(2n+x) = {mynum}*2^(2n{(finxval === 0 ? "" : "+" + finxval)})</div>
    </div>
  );
}

export default App;
