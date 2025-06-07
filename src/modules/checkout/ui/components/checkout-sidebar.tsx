import { formatCurrency } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { CircleXIcon } from 'lucide-react'

interface Props {
  total: number
  onPurchase: () => void
  isCanceled?: boolean
  disabled?: boolean
}

const CheckoutSidebar = ({ total, onPurchase, isCanceled, disabled }: Props) => {
  return (
    <div className="border rounded-md overflow-hidden bg-white flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <p>Total</p>
        <h4 className="font-medium text-lg">{formatCurrency(total)}</h4>
      </div>

      <div className="p-4 flex items-center justify-center">
        <Button
          disabled={disabled}
          onClick={onPurchase}
          className="text-base w-full bg-primary hover:bg-pink-400 hover:text-white cursor-pointer"
          size="lg"
        >
          Checkout
        </Button>
      </div>

      {isCanceled && (
        <div className="p-4 flex justify-center items-cente border-t">
          <div className="bg-red-100 border border-red-400 font-medium px-4 py-3 rounded flex items-center w-full">
            <div className="flex items-center">
              <CircleXIcon className="size-6 mr-2 fill-red-500 text-red-100" />
              <span>Checkout failed. Please try again.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CheckoutSidebar
