package models

case class Product(id: Int, name: String, price: Double)

object Product {
  var products: List[Product] = List(
    Product(1, "Potato", 5.0),
    Product(2, "Cookie", 2.5),
    Product(3, "Orange juice", 3.0)
  )

  def findAll(): List[Product] = products

  def findById(id: Int): Option[Product] = products.find(_.id == id)

  def create(product: Product): Product = {
    products = products :+ product
    product
  }

  def update(id: Int, product: Product): Option[Product] = {
    val index = products.indexWhere(_.id == id)
    if (index >= 0) {
      products = products.updated(index, product)
      Some(product)
    } else {
      None
    }
  }

  def delete(id: Int): Boolean = {
    val originalSize = products.size
    products = products.filterNot(_.id == id)
    originalSize != products.size
  }
}

