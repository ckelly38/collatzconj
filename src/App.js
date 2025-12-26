import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import NumTimesTwoPowerComp from './NumTimesTwoPowerComp';
import commonclass from './commonclass';
function App() {
  let [mynum, setMyNum] = useState(1);
  let [mypow, setMyPow] = useState(1);
  let [errmsg, setErrorMessage] = useState("");
  let [myeqnm, setMyEquationName] = useState("S");
  let [showpropequs, setShowPropEqus] = useState(true);
  let [calcmisevns, setCalcMisEvns] = useState(false);
  let [cycleifone, setCycleIfOne] = useState(false);
  let [textonly, setUseTextOnly] = useState(false);
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
  function genFourthString(num, thirdstr, xvalsempty)
  {
    cc.valMustBeAnInt(num, "num");
    cc.valMustBeBool(xvalsempty, "xvalsempty");
    if (xvalsempty) return "";
    if (num < 0) return "-" + mythrdstr.substring(9);
    else return mythrdstr.substring(9, mythrdstr.length - 1);
  }
  function genFifthString(num, fourthstr, xvalsempty)
  {
    cc.valMustBeAnInt(num, "num");
    cc.valMustBeBool(xvalsempty, "xvalsempty");
    if (xvalsempty) return "";
    if (num < 0) return "-" + myfrthstr.substring(2, myfrthstr.length - 5);// + "- 1"
    else return myfrthstr.substring(0, myfrthstr.length - 4);
  }
  function getNextCollatzNum(num, museshtct, stopatone=true)
  {
    cc.valMustBeBool(museshtct, "museshtct");
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
      else
      {
        const cnum = ((3*num) + ((0 < num) ? 1 : -1)); 
        return (museshtct ? cnum/2 : cnum);
      }
    }
  }
  function goCollatzUntilStop(num, museshtct, cycleifone=false)
  {
    console.log("num = " + num);
    console.log("museshtct = " + museshtct);
    console.log("cycleifone = " + cycleifone);
    cc.valMustBeAnInt(num, "num");
    cc.valMustBeBool(cycleifone, "cycleifone");
    cc.valMustBeBool(museshtct, "museshtct");
    if (num === 1 || num === -1)
    {
      if (cycleifone)
      {
        return [num, ...goCollatzUntilStop(getNextCollatzNum(num, museshtct, false), museshtct, false)];
      }
      else return [num];
    }
    else if (num === 0) return [0];
    else return [num, ...goCollatzUntilStop(getNextCollatzNum(num, museshtct, true), museshtct, false)];
  }
  function getNumStepsForNum(num, cycleifone=false)
  {
    const mlist = goCollatzUntilStop(num, false, cycleifone);
    return mlist.length - 1;
  }
  function genCollatzDispListsWithNumSteps(nums, museshtct, cycleifone=false)
  {
    cc.valMustBeBool(museshtct, "museshtct");
    cc.valMustBeBool(cycleifone, "cycleifone");
    if (cc.isVarEmptyOrNull(nums)) return [];
    const mylists = nums.map((mnum, mi) => {
      const mlist = goCollatzUntilStop(mnum, museshtct, cycleifone);
      const initmstr = mlist.join(", ");
      return initmstr + " (" + (mlist.length - 1) + " steps).";
    });
    const retlist = nums.map((mnum, mi) => (<div key={"sqncefor" + mnum}>{mnum}: {mylists[mi]}
      {((mi + 1 < nums.length) ? <br/> : null)}</div>));
    return retlist;
  }
  function getNKStepsEqualsStrings(nmx, knum, minstps)
  {
    cc.valMustBeAnInt(nmx, "nmx");
    cc.valMustBeAnInt(knum, "knum");
    cc.valMustBeAnInt(minstps, "minstps");
    let mlist = [];
    for (let n = 0; n < nmx; n++)
    {
      mlist.push("n = " + n + " k = " + ((2*n) + knum) + " total_steps = " + minstps + " + " +
        (2*n + knum + 1) + " = " + (minstps + (2*n) + knum + 1));
    }
    return mlist.map((mstr, mi) => <div key={"nkstepswithn=" + mi}>{mstr}</div>);
  }
  function genEquInfoObj(basenum, initval, name)
  {
    cc.valMustBeAnInt(basenum, "basenum");
    cc.valMustBeAnInt(initval, "initval");
    return { "basenum": basenum, "name": name, "initval": initval};
  }
  function getIfOneEquationIsAMatchForAnother(a, b, c, d, mid)
  {
    cc.valMustBeAnInt(a, "a");
    cc.valMustBeAnInt(b, "b");
    cc.valMustBeAnInt(c, "c");
    cc.valMustBeAnInt(d, "d");
    cc.valMustBeAnInt(mid, "mid");
    const equinfoobjs = [genEquInfoObj(1, 1, "A"), genEquInfoObj(5, 3, "B"), genEquInfoObj(13, 17, "C"),
      genEquInfoObj(17, 11, "D"), genEquInfoObj(11, 7, "E"), genEquInfoObj(7, 9, "F"),
      genEquInfoObj(29, 19, "G"), genEquInfoObj(19, 25, "H"), genEquInfoObj(25, 33, "I")];
    const basenumequ = "(" + a + "k" + (b < 0 ? b : "+" + b) + ")";
    const initvalequ = "(" + c + "k" + (d < 0 ? d : "+" + d) + ")";
    //console.log("a = " + a);
    //console.log("b = " + b);
    //console.log("c = " + c);
    //console.log("d = " + d);
    //console.log("base number equ is in the form of " + basenumequ);
    //console.log("initial value equ is in the form of " + initvalequ);
    //Let k = ?; basenumequ = ?; Is a perfect match for ?_n.
    const reslist = equinfoobjs.map((equobjval, mi) => {
      //(ak+b) = equobjval["basenum"];
      //(ck+d) = equobjval["initval"];
      //solve for k which makes them both true
      //basenum - b or + b depending on its sign = ak
      //then divide that by a
      const res = ((b < 0) ? equobjval["basenum"] + (-b) : equobjval["basenum"] - b);
      const ores = ((d < 0) ? equobjval["initval"] + (-d) : equobjval["initval"] - d);
      const fullbaseequstr = "" + basenumequ + " = " + equobjval["basenum"];
      const fullinitvalequstr = "" + initvalequ + " = " + equobjval["initval"];
      const pmatchstr = " Is a perfect match for " + equobjval["name"] + "_N.";
      //console.log("equobj = ", equobjval);
      //console.log("res = " + res);
      //console.log("ores = " + ores);
      
      if ((res % a === 0) && (ores % c === 0))
      {
        //console.log("the ak=res and ck=ores are evenly divisible.");
        
        const finres = res / a;
        const finores = ores / c;
        //console.log("finres = " + finres);
        //console.log("finores = " + finores);

        if (finres === finores)
        {
          return "Let k = " + finres + " " + fullbaseequstr + " " + fullinitvalequstr + pmatchstr;
        }
      }
      return null;
    });
    let finreslist = [];
    reslist.forEach((mstr, mi) => {
      if (cc.isVarEmptyOrNull(mstr));
      else
      {
        finreslist.push(<div key={"equsbatch_" + mid + "match_" + equinfoobjs[mi]["name"]}>{mstr}</div>);
      }
    });
    return finreslist;
  }
  function fullequmatch(a, b, c, d, e, f, mid, neqnm)
  {
    cc.valMustBeAnInt(a, "a");
    cc.valMustBeAnInt(b, "b");
    cc.valMustBeAnInt(c, "c");
    cc.valMustBeAnInt(d, "d");
    cc.valMustBeAnInt(e, "e");
    cc.valMustBeAnInt(f, "f");
    cc.valMustBeAnInt(mid, "mid");
    const abequpt = "(" + a + "k " + ((b < 0) ? b : "+" + b) + ")";
    const cdequpt = "(" + c + "k " + ((d < 0) ? d : "+" + d) + ")";
    const estr = (e === 0 ? "" : "" + ((e < 0) ? "" + e : "+" + e));
    const fstr = (f === 0 ? "" : "" + ((f < 0) ? "" + f : "+" + f));
    const ivalstr = " " + neqnm + "_0 = " + cdequpt;
    const nonhequstr = "" + neqnm + "_n - " + neqnm + "_(n - 1) = " + abequpt + "(2^(2n" + estr +
      "))" + ivalstr + " (NON-HOMOGENEOUS)";
    const hequstr = "" + neqnm + "_n = 1/3(" + abequpt + "(2^(2n" + fstr + ")) - 1) (HOMOGENEOUS)";
    return (<div key={"mynewequstrsbatch_" + mid}>PROPOSED EQUATION {mid}:<br /><br />{nonhequstr}<br />
      {hequstr}<br />{getIfOneEquationIsAMatchForAnother(a, b, c, d, mid)}</div>);
  }
  function genKTable(kmax, basenumsarr, betasubnums)
  {
    //k: 1, 2, 3, 4, 5, 6, 7, 8...
    //arr[0](2^k) ... Beta_? = ?
    //
    let mhdarr = [<th key={"kequ"}>k = </th>];
    for (let i = 1; i < kmax + 1; i++) mhdarr.push(<th key={"kequcol" + i}>{i}</th>);
    mhdarr.push(<th key={"myetccell0"}>...</th>);
    mhdarr.push(<th key={"betanums"}>betanums</th>);
    let bdrws = basenumsarr.map((bnum, bi) => {
      let absinitbnum = Math.abs(bnum);
      let abetanum = bnum * 2;
      let anum = absinitbnum * 2 - 1;//-5 * 2 = -10
      let obnum = absinitbnum * 4 - 1;
      let useanum = (anum % 3 === 0);
      let usebnum = (obnum % 3 === 0);
      console.log("bnum = " + bnum);
      console.log("absinitbnum = " + absinitbnum);
      console.log("anum = " + anum);
      console.log("obnum = " + obnum);
      console.log("useanum = " + useanum);
      console.log("usebnum = " + usebnum);

      let bdrwcells = [];
      for (let i = 0; i < kmax + 1; i++)
      {
        if (i === 0) bdrwcells.push(<td key={"bnum_" + bnum + "_2tok"}>{bnum}(2^k)</td>);
        else
        {
          let cnum = bnum * Math.pow(2, i);
          let usebold = ((i === 1 && useanum) || (usebnum && i === 2));
          let fincnum = (usebold ? <b><u>{cnum}</u></b> : <>{cnum}</>);
          bdrwcells.push(<td key={"bnum_" + bnum + "_2to" + i}>{fincnum}</td>);
        }
      }
      bdrwcells.push(<td key={"bnum_" + bnum + "_etc"}>...</td>);

      if (absinitbnum % 3 === 0)
      {
        bdrwcells.push(<td key={"betanumandinitvalbasenum_" + bnum}>
          (SKIP BASENUM IS A MULTIPLE OF 3)</td>);
      }
      else
      {
        if (useanum === usebnum) throw new Error("useanum and usebnum cannot be the same!");
      
        let initval = (useanum ? anum / 3 : obnum / 3);
        if (bnum < 0) initval *= -1;
        let finbsbval = (betasubnums[bi] < 0 ? "?" : "" + betasubnums[bi]);

        bdrwcells.push(<td key={"betanumandinitvalbasenum_" + bnum}>
          Beta_{finbsbval} = {(useanum ? abetanum : abetanum * 2)}, initval = {initval}</td>);
      }
      return (<tr key={"rowfor" + bnum}>{bdrwcells}</tr>);
    });
    return (<table><thead><tr>{mhdarr}</tr></thead><tbody>{bdrws}</tbody></table>);
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
  const mypowcomps = mynumpowsarr.map((pnum) => <NumTimesTwoPowerComp key={"row" + pnum}
    mynum={mynum} mypow={mypow} oneline={finuseoneline} cpow={pnum} />);// addVal={addVal}
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

  const myresopslist = goCollatzUntilStop(mynum, true, cycleifone);
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
    previousValue + ((Math.abs(currentValue%2) === 1) ? 1 : 0), 0);
  //NOTE on filter on JS: if true keep it else exclude it
  const myoddnums = myresopslist.filter((mval, mindx) => (Math.abs(mval%2) === 1));
  const missingevens = (calcmisevns ? myoddnums.map((mval, mindx) => mval*3+((0 < mval) ? 1 : -1))
    .filter((mval, mindx) => (mindx + 1 < myoddnums.length)) : []);
  const finnumodds = numodds - 1;
  const numevens = totalnums - numodds;
  const totalops = totalnums + finnumodds - 1;
  const dispnote = "NOTE: a shortcut has been applied that when an odd number is found, the next " +
    "one will always be even unless it 1, then you just stop, so the divide by 2 has already been " +
    "applied.";
  const mythrdstr = (xvalsempty ? "" : genThirdString(mynum, pxvals[myfinxvali]));
  const myfrthstr = genFourthString(mynum, mythrdstr, xvalsempty);
  const myfifthstr = genFifthString(mynum, myfrthstr, xvalsempty);
  console.log("APP: myfrthstr = " + myfrthstr);
  console.log("APP: myfifthstr = " + myfifthstr);
  
  const mykeqlsstr = (xvalsempty ? "" : myfifthstr.substring(myfifthstr.length - 5,
    myfifthstr.length - 1));
  console.log("APP: mykeqlsstr = " + mykeqlsstr);
  const mysixthstr = (xvalsempty ? "" : mykeqlsstr.substring(mykeqlsstr.indexOf("+") + 1));
  const mysxthnum = (xvalsempty ? 0: Number(mysixthstr));
  const myfinsxthnum = (xvalsempty ? 0: mysxthnum + 1);
  console.log("APP: numodds = " + numodds);

  //want the x vals that converge... so we can tell the user so x, y, z, ... converges...
  //then we want to display the pattern Sn - (Sn-1) = x * 2 ^ (2n+or-0 or 1 or 2)
  //we can also indicate that the first x number will go to the mynum...
  //we could also display the collatz chain for the number
  return (
    <div className="App">
      <h1>Collatz Conjecture And Information App</h1>
      <label htmlFor="equnm" name="equnmlbl">My Equation Name:</label>
      <input id="equnm" name="equnm" type="text" value={myeqnm}
        onChange={(event) => setMyEquationName(event.target.value)}
        placeholder="enter an equation name" />
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
      <button onClick={(event) => setShowPropEqus(!showpropequs)}>
        {showpropequs ? "hide" : "show"} proposed equations</button>
      <label htmlFor="txtonly" name="txtonlylbl">Use Text Only: </label>
      <input type="checkbox" name="txtonly" id="txtonly" checked={textonly}
        onChange={(event => setUseTextOnly(!textonly))} />
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
              {myeqnm}{(textonly ? "_n" : <sub>n</sub>)} - {myeqnm}
              {(textonly ? "_(n-1)" : <sub>n-1</sub>)} = {mynum}*2^(2n{finpartstr}) {myeqnm}
              {(textonly ? "_0" : <sub>0</sub>)} = {myxvals[0]}
        </div>
        <h4>Begin getting the Homogeneous Recurance Relation Here:</h4>
        <div>{myeqnm}{(textonly ? "_n" : <sub>n</sub>)}{genSecondString(mynum, myxvals[0])}</div>
        <div>3*{myxvals[0]} {negntnumstr} 1 = {oval} = {mynum}*2^(x)</div>
        <div>(3*{myxvals[0]} {negntnumstr} 1)/{mynum} = {ovaldnum} = 2^(x)</div>
        <div>x = one of the following [0, 1, 2] = {pxvals[myfinxvali]}</div>
        <div style={{display: "inline-block", border: "1px solid black"}}>
              {myeqnm}{(textonly ? "_n" : <sub>n</sub>)}{mythrdstr} {myeqnm}
              {(textonly ? "_0" : <sub>0</sub>)} = {myxvals[0]}
        </div>
        <h5>NOTE: On both of those above n is a non-negative integer.</h5>
        <p>For the sequence: </p>
        <div style={{display: "inline-block", border: "1px solid black"}}>
              {myeqnm}{(textonly ? "_n" : <sub>n</sub>)} - {myeqnm}
              {(textonly ? "_(n-1)" : <sub>n-1</sub>)} = {mynum}*2^(2n{finpartstr})
              {" where "}{myeqnm}{(textonly ? "_0" : <sub>0</sub>)} = {myxvals[0]} OR {myeqnm}
              {(textonly ? "_n" : <sub>n</sub>)}{mythrdstr}
        </div>
        <br/>
        <br/>
        <div>which produces: {myxvals.join(", ")} ...<br/>
        <br/>
        {genCollatzDispListsWithNumSteps(myxvals, false, false)}
        ...<br/>
        <br/>
        {myeqnm}{(textonly ? "_n" : <sub>n</sub>)} is odd so: 3({myeqnm}
        {(textonly ? "_n" : <sub>n</sub>)})+1=2^k<br/>
        3({mythrdstr.substring(3)})+1=2^k<br/>
        {myfrthstr}+1=2^k<br/>
        {myfifthstr}=2^k<br/>
        k={mykeqlsstr}<br/>
        steps_to_reach_k=the_number_of_steps_for_base_number_to_reach_1={totalops}<br/>
        total_steps = steps_to_reach_k + k + 1 = {totalops} + ({mykeqlsstr}) + 1 = <br/>
        total_steps = {totalops} + 2n + {myfinsxthnum} = 2n + {totalops + myfinsxthnum}<br/>
        <br/>
        {getNKStepsEqualsStrings(myxvals.length, mysxthnum, totalops)}
        ...<br/>
        STEPS_FOR_{myeqnm}_N = steps_to_reach_k+k+1={totalops}+({mykeqlsstr})+1=
        {totalops}+2n+{myfinsxthnum}=2n+{totalops+myfinsxthnum}<br/>
        </div>
        <br />
        {genKTable(8, [1, 5, 21, 13, 17, 11, 7, 29, 19, 25, 85],
          [0, 1, -1, 2, 3, 4, 5, 6, 7, 8, -1])}
        {(showpropequs ? (<div>
          <br/>
          {fullequmatch(3, -1, 2, -1, -1, 1, 1, "GenD")}<br/>
          {fullequmatch(3, 2, 2, 1, -1, 1, 2, "GenJ")}<br/>
          {fullequmatch(6, -1, 4, -1, -1, 1, 3, "GenM")}<br/>
          {fullequmatch(12, -1, 8, -1, -1, 1, 4, "GenK")}<br/>
          {fullequmatch(3, 1, 4, 1, 0, 2, 5, "GenS")}<br/>
        </div>) : null)}
      </div>)}
      <div><br/>{mydispresliststr}</div>
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
