function BasketCard({product}) {
  return (
    <div>
      <img className={''} src={product.image} alt={product.title} />
      <h2 className={''}>{product.title}</h2>
      <p>{product.quantity} item{product.quantity > 1 ? 's' : ''}</p>
      <p>Total: £{product.quantity * product.price}</p>
    </div>
  )
}

export default BasketCard;