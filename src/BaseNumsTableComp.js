import commonclass from './commonclass';
function BaseNumsTableComp({kmax, setkmax, inferorder, setinferoder, bsnumsarr, setbsnumsarr,
    seterrmsg})
{
    //base nums array with order unless infer order is not checked
    function MyBaseNumComp({index})
    {
        function changeANumber(nval, nordr, mi)
        {
            let narr = [...bsnumsarr];
            narr[mi] = {"bsnum": nval, "order": nordr};
            seterrmsg("");
            setbsnumsarr(narr);
        }
        return (<span style={{display: "inline-block"}}>
            <input type="number" step={1} min={1} name={"val_" + index} id={"val_" + index}
                value={bsnumsarr[index]["bsnum"]} onChange={(event) => {
                    const nval = Number(event.target.value);
                    let nordr = bsnumsarr[index]["order"];
                    if (nval %3 === 0) nordr = -1;//also set order for this index to be -1
                    changeANumber(nval, nordr, index);}} />
            {inferorder ? null :
            <><br />
            <input type="number" step={1} min={1} name={"order_" + index} id={"order_" + index}
                value={bsnumsarr[index]["order"]} onChange={(event) => {
                    if (bsnumsarr[index]["bsnum"] % 3 === 0)
                    {
                        if (bsnumsarr[index]["order"] === -1)
                        {
                            seterrmsg("cannot change the order for multiples of 3!");
                        }
                        else changeANumber(bsnumsarr[index]["bsnum"], -1, index);
                    }
                    else
                    {
                        const nordr = Number(event.target.value);
                        changeANumber(bsnumsarr[index]["bsnum"], nordr, index);
                    }
                }} /></>}
        </span>);
    }
    //export default MyBaseNumComp;

    function addOrRemoveANumber(userem)
    {
        if (userem)
        {
            if (1 < bsnumsarr.length)
            {
                let narr = [];
                bsnumsarr.forEach((mobj, mi) => {
                    if (mi + 1 < bsnumsarr.length)
                    {
                        narr.push({"bsnum": mobj["bsnum"], "order": mobj["order"]});
                    }
                });
                //console.log("BSNUMSARR BEFORE REMOVAL: ", bsnumsarr);
                //console.log("NEW ARRAY BEFORE REMOVAL: ", narr);
                seterrmsg("");
                setbsnumsarr(narr);
            }
            else seterrmsg("You cannot remove the only number from the base nums array!");
        }
        else
        {
            let narr = [...bsnumsarr, {"bsnum": 0, "order": -1}];
            seterrmsg("");
            setbsnumsarr(narr);
        }
    }
    function addANumber() { return addOrRemoveANumber(false); }
    function removeANumber() { return addOrRemoveANumber(true); }

    function getNewBSOrderObjArr(bsnums, bsorder)
    {
        return bsnums.map((mnum, mi) => {return {"bsnum": mnum, "order": bsorder[mi]}; });
    }
    function genMainTableBSNumsObj()
    {
        const narr = getNewBSOrderObjArr([1, 5, 21, 13, 17, 11, 7, 29, 19, 25, 85],
          [0, 1, -1, 2, 3, 4, 5, 6, 7, 8, -1]);
        seterrmsg("");
        setbsnumsarr(narr);
    }

    const mybsnumcomps = bsnumsarr.map((mnum, mi) =>
        <MyBaseNumComp inferorder={inferorder} index={mi} />);
    return (<div>
        <label htmlFor="kmax" name="kmaxlbl">Enter kmax:</label>
        <input type="number" step={1} min={1} name="kmax" id="kmax" value={kmax}
            onChange={(event) => setkmax(Number(event.target.value))} />
        <label htmlFor="inferordr" name="inferordrlbl">Infer Order:</label>
        <input type="checkbox" id="inferordr" name="inferorder" checked={inferorder}
            onChange={(event) => {
                //the infered order will if it is a multiple of 3 set it to -1
                //if not then it will use the index; otherwise the user can specify an order.
                if (inferorder);
                else
                {
                    let nobjarr = bsnumsarr.map((mobj, mi) => {
                        return {"bsnum": mobj["bsnum"],
                            "order": (mobj["bsnum"] % 3 === 0) ? -1 : mi};
                    });
                    seterrmsg("");
                    setbsnumsarr(nobjarr);
                }
                setinferoder(!inferorder); }} />
        <button onClick={(event) => genMainTableBSNumsObj()}>Start with main table!</button>
        <br />
        <span style={{display: "inline-block"}}>
            {mybsnumcomps}
            <button onClick={(event) => addANumber()}>Add a number</button>
            {(1 < bsnumsarr.length) ? <button onClick={(event) => removeANumber()}>
                Remove Last Number</button>: null}
        </span>
    </div>);
}
export default BaseNumsTableComp;
