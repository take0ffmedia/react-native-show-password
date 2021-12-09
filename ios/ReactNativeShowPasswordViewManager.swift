@objc(ReactNativeShowPasswordViewManager)
class ReactNativeShowPasswordViewManager: RCTViewManager {
  var passwordTextField: HideShowPasswordTextField!
  @objc var onChange:RCTDirectEventBlock? = nil

  override func view() -> (HideShowPasswordTextField) {
      passwordTextField = HideShowPasswordTextField(frame: CGRect(x: 0, y: 0, width: 100, height: 50))
      passwordTextField.isSecureTextEntry = true
      passwordTextField.borderStyle = .none
      passwordTextField.clearButtonMode = .whileEditing
      passwordTextField.layer.borderWidth = 0.5
      passwordTextField.layer.borderColor = UIColor(red: 220/255.0, green: 220/255.0, blue: 220/255.0, alpha: 1.0).cgColor
      passwordTextField.borderStyle = UITextField.BorderStyle.none
      passwordTextField.clipsToBounds = true
      passwordTextField.layer.cornerRadius = 0
      passwordTextField.rightView?.tintColor = UIColor(red: 0.204, green: 0.624, blue: 0.847, alpha: 1)
      
      return passwordTextField
  }
    
}


class ReactNativeShowPasswordView : UIView {

  @objc var color: String = "" {
    didSet {
      self.backgroundColor = hexStringToUIColor(hexColor: color)
    }
  }

  func hexStringToUIColor(hexColor: String) -> UIColor {
    let stringScanner = Scanner(string: hexColor)

    if(hexColor.hasPrefix("#")) {
      stringScanner.scanLocation = 1
    }
    var color: UInt32 = 0
    stringScanner.scanHexInt32(&color)

    let r = CGFloat(Int(color >> 16) & 0x000000FF)
    let g = CGFloat(Int(color >> 8) & 0x000000FF)
    let b = CGFloat(Int(color) & 0x000000FF)

    return UIColor(red: r / 255.0, green: g / 255.0, blue: b / 255.0, alpha: 1)
  }
}
