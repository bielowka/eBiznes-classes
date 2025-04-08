package controllers

import models.Product
import play.api.libs.json._
import play.api.mvc._

import javax.inject._

@Singleton
class ProductController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

  implicit val productFormat: OFormat[Product] = Json.format[Product]

  def getAllProducts: Action[AnyContent] = Action {
    val products = Product.findAll()
    Ok(Json.toJson(products))
  }

  def getProduct(id: Int): Action[AnyContent] = Action {
    Product.findById(id) match {
      case Some(product) => Ok(Json.toJson(product))
      case None => NotFound(Json.obj("error" -> "Product not found"))
    }
  }

  def createProduct: Action[JsValue] = Action(parse.json) { request =>
    request.body.validate[Product] match {
      case JsSuccess(product, _) =>
        val createdProduct = Product.create(product)
        Created(Json.toJson(createdProduct))
      case JsError(errors) => BadRequest(Json.obj("error" -> "Invalid JSON"))
    }
  }

  def updateProduct(id: Int): Action[JsValue] = Action(parse.json) { request =>
    request.body.validate[Product] match {
      case JsSuccess(product, _) =>
        Product.update(id, product) match {
          case Some(updatedProduct) => Ok(Json.toJson(updatedProduct))
          case None => NotFound(Json.obj("error" -> "Product not found"))
        }
      case JsError(errors) => BadRequest(Json.obj("error" -> "Invalid JSON"))
    }
  }

  def deleteProduct(id: Int): Action[AnyContent] = Action {
    if (Product.delete(id)) {
      NoContent
    } else {
      NotFound(Json.obj("error" -> "Product not found"))
    }
  }
}
