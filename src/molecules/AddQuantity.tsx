import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import updateQuantityProduction from "../api/updateQuantityProduction"
import getOneProductionOrder from "../api/getOneProductionOrder"
import Button from "@/atoms/Button"
import Input from "../atoms/Input"

interface ProductionOrder {
  id: number
  actual_final_product_quantity: number
}

export default function AddQuantity() {
  const { id } = useParams<{ id: string }>()
  const [productionOrder, setProductionOrder] =
    useState<ProductionOrder | null>(null)

  const [draftQuantity, setDraftQuantity] = useState<number>(0)

  const fetchProductionOrder = async () => {
    if (!id) return
    const data = await getOneProductionOrder(Number(id))
    setProductionOrder(data)
    setDraftQuantity(data.actual_final_product_quantity)
  }

  useEffect(() => {
    fetchProductionOrder()
  }, [id])


  const addQuantity = (value: number) => {
    setDraftQuantity((prev) => prev + value)
  }

  const validateQuantity = async () => {
    if (!id) return
    await updateQuantityProduction(Number(id), draftQuantity)
    await fetchProductionOrder()
  }

  if (!productionOrder) return null

  return (
    <div className="flex flex-col gap-4">
      <Input
        type="number"
        identification="quentity"
        value={draftQuantity}
        onChange={(value) => setDraftQuantity(Number(value))}
      />

      <div className="flex gap-2">
        <Button onClick={() => addQuantity(5)}>+5</Button>
        <Button onClick={() => addQuantity(10)}>+10</Button>
        <Button onClick={() => addQuantity(100)}>+100</Button>
      </div>

      <Button variant="outline">
        Clavier numérique
      </Button>

      <Button onClick={validateQuantity}>
        Valider
      </Button>
    </div>
  )
}