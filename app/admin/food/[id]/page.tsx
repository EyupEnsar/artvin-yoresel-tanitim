import FoodForm from '../FoodForm'
export default function EditFoodPage({ params }: { params: Promise<{ id: string }> }) {
  return <FoodForm paramsPromise={params} />
}
