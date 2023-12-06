const createCoupon = async (req, res, next) => {
    const {qty, name, description, type, uses, is_fixed, max_uses, expiresAT, startsAT} = req.body
    try {
        const newCouponList = await createCouponList({
            qty: qty,
            name: name,
            description: description,
            type: type,
            uses: uses,
            is_fixed: is_fixed,
            max_uses: max_uses,
            expiresAT: expiresAT,
            startsAT: startsAT,
        });
    }catch(error){
        next(error)
    }
}