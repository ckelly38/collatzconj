import commonclass from './commonclass';
function NumTimesTwoPowerComp({mynum, mypow, addVal=null, oneline=true, cpow=1})
{
    console.log("mynum = ", mynum);
    console.log("cpow = ", cpow);
    
    const cc = new commonclass();
    const mycompval = ((cpow === 1) ? mynum*2 : mynum * Math.pow(2, cpow));
    const addthreex = (cc.valIsDivisibleByThree(mycompval - 1));
    const fparttexstr = (addthreex ? " " + (mycompval - 1) + "=3x ": "");
    const mtexstr = (addthreex ? "x=" + ((mycompval - 1) / 3) : "");
    //if (addthreex) addVal(((mycompval - 1) / 3));
    const resstr = "" + mynum + "*2" + ((cpow === 1) ? "": "^" + cpow) + "=" + mycompval + fparttexstr;
    return (<div id={"row"+cpow} style={{
            display: (oneline ? "inline-" : "") + "block"}}>
        {resstr}{(addthreex ? <div style={{
            display: "inline-block",
            border: "1px solid black"}}>{mtexstr}</div>: <></>)}</div>);
}
export default NumTimesTwoPowerComp;
