class commonclass
{
    isVarNullOrUndefined(mval) { return (mval === null || mval === undefined); }
    isVarEmptyOrNull(mstr) { return (this.isVarNullOrUndefined(mstr) || mstr.length < 1); }
    isDigit(mc)
    {
        return (mc === '0' || mc === '1' || mc === '2' || mc === '3' || mc === '4' || mc === '5' ||
            mc === '6' || mc === '7' || mc === '8' || mc === '9');
    }
    valMustBeBool(val, varnm="varnm")
    {
        if (this.isVarEmptyOrNull(varnm)) return this.valMustBeBool(val, varnm="varnm");
        if (val === true || val === false) return true;
        else throw new Error("" + varnm + " must be a boolean value, but it was not!");
    }
    valIsNum(val)
    {
        if (this.isVarEmptyOrNull(val)) return false;
        else
        {
            const mstr = "" + val;
            let decfnd = false;
            for (let i = 0; i < mstr.length; i++)
            {
                if (this.isDigit(mstr[i]));
                else if (mstr[i] === '-' && i === 0);
                else if (mstr[i] === '.' && !decfnd) decfnd = true;
                else
                {
                    //throw new Error("val must be a number, but at least one of the characters " +
                    //    "was not a digit!");
                    return false;
                }
            }
            return true;
        }
    }
    valMustBeANum(val, incdec, varnm="varnm")
    {
        this.valMustBeBool(incdec, "incdec");
        if (this.isVarEmptyOrNull(varnm)) return this.valMustBeANum(val, incdec, varnm="varnm");
        if (this.valIsNum(val))
        {
            if (incdec) return true;
            else
            {
                const mstr = "" + val;
                if (-1 < mstr.indexOf(".") && mstr.indexOf(".") < mstr.length)
                {
                    throw new Error("" + varnm + " must be an integer!");
                }
            }
        }
        else throw new Error("" + varnm + " must be a number!");
    }
    valMustBeADecNum(val, varnm="varnm") { return this.valMustBeANum(val, true, varnm); }
    valMustBeAnInt(val, varnm="varnm") { return this.valMustBeANum(val, false, varnm); }
    valIsDivisibleByThree(val)
    {
        const mstr = "" + val;
        this.valMustBeANum(val, true, "val");
        if (Number(val) < 0) return this.valIsDivisibleByThree(-1*Number(val));

        let mynums = [];
        for (let i = 0; i < mstr.length; i++) mynums.push(Number(mstr[i]));
        //console.log("mynums = ", mynums);
        const res = mynums.reduce((previousValue, currentValue, cindx) => previousValue + currentValue, 0);
        //console.log("res = ", res);
        return (res % 3 === 0);
        //throw new Error("NOT DONE YET 7-24-2025 11:09 PM MST!");
    }
}
export default commonclass;
