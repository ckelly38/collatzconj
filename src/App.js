import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import NumTimesTwoPowerComp from './NumTimesTwoPowerComp';
import commonclass from './commonclass';
function App() {
  let [mynum, setMyNum] = useState(1);
  let [mypow, setMyPow] = useState(1);
  let [errmsg, setErrorMessage] = useState("");
  let [calcmisevns, setCalcMisEvns] = useState(false);
  let [cycleifone, setCycleIfOne] = useState(false);
  //let [myxvals, setMyXVals] = useState([]);
  const cc = new commonclass();
  function genFirstString(a, b, num)
  {
    cc.valMustBeAnInt(a, "a");
    cc.valMustBeAnInt(b, "b");
    cc.valMustBeAnInt(num, "num");
    return "" + b + " - " + a + " = " + (b - a) + " = " + num +"*2^(2n+x)";
  }
  function genSecondString(num, equval)
  {
    cc.valMustBeAnInt(num, "num");
    cc.valMustBeAnInt(equval, "equval");
    const isnumneg = (num < 0);
    const mynummag = (isnumneg ? -num : num);
    const numsgnstr = (isnumneg ? "-" : "");
    const ntnegstr = (isnumneg ? "+" : "-");
    return " = " + numsgnstr + "(1/3)(" + mynummag + "*2^(2n+x) " + ntnegstr + " 1), n=0, " +
      numsgnstr + "(1/3)(" + mynummag + "*2^(x) " + ntnegstr + " 1) = " + equval;
  }
  function genThirdString(num, mxval)
  {
    cc.valMustBeAnInt(num, "num");
    cc.valMustBeAnInt(mxval, "mxval");
    const isnumneg = (num < 0);
    const mynummag = (isnumneg ? -num : num);
    const numsgnstr = (isnumneg ? "-" : "");
    const onegntnumstr = (isnumneg ? "+" : "-");
    const mxvalstr = ((mxval === 0) ? "" : "+") + mxval;
    return " = " + numsgnstr + "(1/3)(" + mynummag + "*2^(2n" + mxvalstr + ") " + onegntnumstr + " 1)";
  }
  function getNextCollatzNum(num, stopatone=true)
  {
    cc.valMustBeBool(stopatone, "stopatone");
    cc.valMustBeAnInt(num, "num");
    if (num %2 === 0)
    {
      if (num === 0) return 0;
      else return num / 2;
    }
    else
    {
      if (num === 1 && stopatone) return 1;
      else if (num === -1 && stopatone) return -1;
      else return ((3*num) + 1*((0 < num) ? 1 : -1))/2;
    }
  }
  function goCollatzUntilStop(num, cycleifone=false)
  {
    cc.valMustBeAnInt(num, "num");
    cc.valMustBeBool(cycleifone, "cycleifone");
    if (num === 1 || num === -1)
    {
      if (cycleifone) return [num, ...goCollatzUntilStop(getNextCollatzNum(num, false))];
      else return [num];
    }
    else if (num === 0) return [0];
    else return [num, ...goCollatzUntilStop(getNextCollatzNum(num, true))];
  }
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
  const finuseoneline = useoneline;//const finuseoneline = (useoneline && mynum < 101);
  const blckstr = (finuseoneline ? "inline-" : "") + "block";
  const mypowcomps = mynumpowsarr.map((pnum) => <NumTimesTwoPowerComp key={"row" + pnum} mynum={mynum}
    mypow={mypow} oneline={finuseoneline} cpow={pnum} />);// addVal={addVal}
  const mypowvalsminusone = mynumpowsarr.map((pnum) =>
    mynum*Math.pow(2, pnum) - 1*((0 < mynum) ? 1: -1));
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
  const finpartstr = ((finxval === 0) ? "": ((0 < finxval) ? "+" + finxval: "-" + -finxval));
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
  const mynumisneg = (mynum < 0);
  const pxvals = [0, 1, 2];
  const mynummag = (mynumisneg ? -mynum : mynum);
  const numsgstr = (mynumisneg ? "-" : "");
  const negntnumstr = (mynumisneg ? "-" : "+");
  const onegntnumstr = (mynumisneg ? "+" : "-");
  console.log("APP: useoneline = " + useoneline);
  console.log("APP: finuseoneline = " + finuseoneline);
  console.log("APP: blckstr = " + blckstr);
  console.log("APP: ismynuminvalid = " + ismynuminvalid);
  console.log("APP: errmsg = " + errmsg);
  console.log("APP: fstpwindx = " + fstpwindx);
  console.log("APP: myxvals = ", myxvals);
  console.log("APP: pxvals = ", pxvals);

  const xvalsempty = (cc.isVarEmptyOrNull(myxvals) || myxvals.length < 2);
  const oval = (xvalsempty ? 0 : (mynumisneg ? (3*myxvals[0] - 1) : (3*myxvals[0] + 1))); 
  const ovaldnum = ((mynum === 0) ? 0 : oval/mynum);
  console.log("APP: oval = " + oval);
  console.log("APP: ovaldnum = " + ovaldnum);
  
  let myfinxvali = -1;
  if (xvalsempty) myfinxvali = 0;
  else
  {
    for (let i = 0; i < pxvals.length; i++)
    {
      if (ovaldnum === Math.pow(2, pxvals[i]))
      {
        //use this...
        console.log("APP: USE THIS ONE: pxvals[" + i + "] = " + pxvals[i]);
        myfinxvali = i;
        break;
      }
    }
  } 
  console.log("APP: myfinxvali = " + myfinxvali);
  console.log("APP: cycleifone = " + cycleifone);
  console.log("APP: calcmisevns = " + calcmisevns);

  const myresopslist = goCollatzUntilStop(mynum, cycleifone);
  const mydispresliststr = myresopslist.join(" -> ");
  const totalnums = myresopslist.length;
  //note: the display list is minus evens for the odds.
  //so for every odd except 1: there is a missing even on this list.
  //5 -> 16 -> 8 -> 4 -> 2 -> 1 (orig list has 6 items 5 opps)
  //     1     2    3    4    5
  //5 -> 8 -> 4 -> 2 -> 1 (displayed list has 5 items 5 opps (you need to count missing evens))
  //     1    2    3    4
  //7 -> 22 -> 11 -> 34 -> 17 -> 52 -> 26 -> 13 -> 40 -> 20 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1
  //     1     2     3     4     5     6     7     8     9     10    11   12   13    14   15   16
  //     1           2           3                 4                      5
  //2(numodds - 1) + numevens = totalops
  //2numodds - 2 + numevens = totalops
  //numodds + numodds - 2 + numevens = totalops
  //NOTE: numodds + numevens = totalnums
  //numodds + totalnums - 2 = totalops
  //NOTE: numodds - 1 = finnumodds
  //numodds + totalnums - 1 - 1 = totalops
  //numodds - 1 + totalnums - 1 = totalops
  //finnumodds + totalnums - 1 = totalops
  //totalops = origlist.length - 1
  //2 + 2 - 2 + 3 = 5

  //previous value of the accumulator not previous value in the array my mistake on VSCode.
  //however previous value of the accumulator will be the the first value of the array
  //if the accumulator is not specifically initialized to zero.
  const numodds = myresopslist.reduce((previousValue, currentValue, currentIndex) =>
    previousValue + ((currentValue%2 === 1) ? 1 : 0), 0);
  //NOTE on filter on JS: if true keep it else exclude it
  const myoddnums = myresopslist.filter((mval, mindx) => (mval%2 === 1));
  const missingevens = (calcmisevns ? myoddnums.map((mval, mindx) => mval*3+1)
    .filter((mval, mindx) => (mindx + 1 < myoddnums.length)) : []);
  const finnumodds = numodds - 1;
  const numevens = totalnums - numodds;
  const totalops = totalnums + finnumodds - 1;
  const dispnote = "NOTE: a short cut has been applied that when an odd number is found, the next " +
    "one will always be even unless it 1, then you just stop, so the divide by 2 has already been " +
    "applied.";
  //console.log("APP: numodds = " + numodds);

  //want the x vals that converge... so we can tell the user so x, y, z, ... converges...
  //then we want to display the pattern Sn - (Sn-1) = x * 2 ^ (2n+or-0 or 1 or 2)
  //we can also indicate that the first x number will go to the mynum...
  //we could also display the collatz chain for the number
  return (
    <div className="App">
      <h1>Collatz Conjecture And Information App</h1>
      <label htmlFor="mynum" name="mynumlbl">My odd number:</label>
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
      <label htmlFor="mypower" name="mypowerlbl">My power number:</label>
      <input id="mypower" name="mypower" type="number" min={1} step={1} value={mypow}
        onChange={(event) => setMyPow(Number(event.target.value))}
        placeholder="enter an integer power" />
      <button onClick={(event) => setCalcMisEvns(!calcmisevns)}>
        {calcmisevns ? "hide" : "show"} missing evens</button>
      {((mynummag === 1) ? <><label htmlFor="cycifone" name="cycifonelbl">Cycle If One: </label>
      <input type="checkbox" name="cycifone" id="cycifone" checked={cycleifone}
        onChange={(event => setCycleIfOne(!cycleifone))} /></>:null)}
      <h4>Attempting to get other odd numbers in a sequence that converges to {mynum} here:</h4>
      {(cc.isVarEmptyOrNull(errmsg) ? <div style={{blckstr}}>
        {myfinelems}</div>: <p style={{color: "red"}}>{errmsg}</p>)}
      <div>So {mynum + " <- " + myxvals.join(", ")} ... converges if {mynum} converges.</div>
      {(xvalsempty ? <></>: <div>
        <h4>Begin getting the Non-Homogeneous Recurance Relation Here:</h4>
        <div>{genFirstString(myxvals[0], myxvals[1], mynum)}</div>
        <div>2n + x = {minpnum}, n = 1, 2 + x={minpnum}, x={finxval}</div>
        <div>{mynum}*2^(2n+x) = {mynum}*2^(2n{finpartstr})</div>
        <div style={{display: "inline-block", border: "1px solid black"}}>
              S<sub>n</sub> - S<sub>n-1</sub> = {mynum}*2^(2n{finpartstr}) S<sub>0</sub> = {myxvals[0]}
        </div>
        <h4>Begin getting the Homogeneous Recurance Relation Here:</h4>
        <div>S<sub>n</sub>{genSecondString(mynum, myxvals[0])}</div>
        <div>3*{myxvals[0]} {negntnumstr} 1 = {oval} = {mynum}*2^(x)</div>
        <div>(3*{myxvals[0]} {negntnumstr} 1)/{mynum} = {ovaldnum} = 2^(x)</div>
        <div>x = one of the following [0, 1, 2] = {pxvals[myfinxvali]}</div>
        <div style={{display: "inline-block", border: "1px solid black"}}>
              S<sub>n</sub>{genThirdString(mynum, pxvals[myfinxvali])} S<sub>0</sub> = {myxvals[0]}
        </div>
        <h5>NOTE: On both of those above n is a non-negative integer.</h5>
      </div>)}
      <div>{mydispresliststr}</div>
      <p>{dispnote}</p>
      <h4>Trace Statistics:</h4>
      <div>Number of Odds: {numodds}</div>
      <div>Number of Evens: {numevens}</div>
      <div>Total Numbers: {totalnums}</div>
      <div>Number of Missing Evens: {finnumodds}</div>
      <div>Missing Even Numbers: [{missingevens.join(", ")}]</div>
      <div>Total Number of Collatz Opperations: {totalops}</div>
    </div>
  );
}

export default App;
