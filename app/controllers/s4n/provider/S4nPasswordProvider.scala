package controllers.s4n.provider

import com.mohiva.play.silhouette.api.LoginInfo
import com.mohiva.play.silhouette.impl.providers.PasswordProvider

import scala.concurrent.Future

trait S4nPasswordProvider extends PasswordProvider {

  override def authenticate(loginInfo: LoginInfo, password: String): Future[State] = {
    println(s"authenticating $loginInfo, password $password")
    Future.successful(Authenticated)
  }

}
