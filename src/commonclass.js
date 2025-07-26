class commonclass
{
    isVarNullOrUndefined(mval) { return (mval === null || mval === undefined); }
    isVarEmptyOrNull(mstr) { return (this.isVarNullOrUndefined(mstr) || mstr.length < 1); }
    isDigit(mc)
    {
        return (mc === '0' || mc === '1' || mc === '2' || mc === '3' || mc === '4' || mc === '5' ||
            mc === '6' || mc === '7' || mc === '8' || mc === '9');
    }
    valIsDivisibleByThree(val)
    {
        const mstr = "" + val;
        if (this.isVarEmptyOrNull(mstr)) { throw new Error("val must not be empty or null!"); }
        else
        {
            if (val < 0) return this.valIsDivisibleByThree(-val);

            let decfnd = false;
            for (let i = 0; i < mstr.length; i++)
            {
                if (this.isDigit(mstr[i]));
                else if (mstr[i] === '-' && i === 0);
                else if (mstr[i] === '.' && !decfnd) decfnd = true;
                else
                {
                    throw new Error("val must be a number, but at least one of the characters " +
                        "was not a digit!");
                }
            }
        }

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
