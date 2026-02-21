export const formatCurrency = (amount: number) => {
    if (!amount) return "₹0"

    if (amount >= 1_00_00_000) {
        return `₹${(amount / 1_00_00_000).toFixed(2)} Cr`
    }

    if (amount >= 1_00_000) {
        return `₹${(amount / 1_00_000).toFixed(2)} L`
    }

    return `₹${amount.toLocaleString("en-IN")}`
}