//
//  HideShowPasswordTextField.swift
//  takeoffmedia-react-native-show-password
//
//  Created by Jonathan Machado on 26/11/21.
//

import Foundation
import UIKit

protocol HideShowPasswordTextFieldDelegate: AnyObject {
    func isValidPassword(_ password: String) -> Bool
}

public class HideShowPasswordTextField: UITextField {
    weak var passwordDelegate: HideShowPasswordTextFieldDelegate?
    @objc var isVisible: Bool = false
    @objc var onChange:RCTBubblingEventBlock? = nil
    @objc var onBlur:RCTBubblingEventBlock? = nil
    @objc var onFocus:RCTBubblingEventBlock? = nil
    @objc var inputStyle: NSDictionary? = nil
    @objc var labelStyle: NSDictionary? = nil
    @objc var returnKeyTypeProp: String? = nil
    @objc var color: String = "" {
      didSet {
        self.textColor = hexStringToUIColor(hexColor: color)
      }
    }

    let padding = UIEdgeInsets(top: 0, left: 12, bottom: 0, right: 55)
    override open func textRect(forBounds bounds: CGRect) -> CGRect {
        return bounds.inset(by: padding)
    }
    override open func placeholderRect(forBounds bounds: CGRect) -> CGRect {
        return bounds.inset(by: padding)
    }
    override open func editingRect(forBounds bounds: CGRect) -> CGRect {
        return bounds.inset(by: padding)
    }
    public override func didSetProps(_ changedProps: [String]!) {
        if (self.returnKeyTypeProp != nil) {
            var typeKeyboard = UIReturnKeyType.default
            switch self.returnKeyTypeProp {
                case "default" : typeKeyboard = UIReturnKeyType.default
                case "go" : typeKeyboard = UIReturnKeyType.go
                case "google" : typeKeyboard = UIReturnKeyType.google
                case "join" : typeKeyboard = UIReturnKeyType.join
                case "next": typeKeyboard = UIReturnKeyType.next
                case "route" : typeKeyboard = UIReturnKeyType.route
                case "search" : typeKeyboard = UIReturnKeyType.search
                case "send": typeKeyboard = UIReturnKeyType.send
                case "yahoo": typeKeyboard = UIReturnKeyType.yahoo
                case "done" : typeKeyboard = UIReturnKeyType.done
                default: typeKeyboard = UIReturnKeyType.default
            }
            self.returnKeyType = typeKeyboard
        }
        viewWasToggled(passwordToggleVisibilityView, isSelected: self.isVisible)
    }
    var preferredFont: UIFont? {
        didSet {
            self.font = nil
            if self.isSecureTextEntry {
                self.font = self.preferredFont
            }
        }
    }

    override public var isSecureTextEntry: Bool {
        didSet {
            if !self.isSecureTextEntry {
                self.font = nil
                self.font = self.preferredFont
            }

            // Hack to prevent text from getting cleared when switching secure entry
            // https://stackoverflow.com/a/49771445/1417922
            if self.isFirstResponder {
                _ = self.becomeFirstResponder()
            }
        }
    }
    fileprivate var passwordToggleVisibilityView: PasswordToggleVisibilityView!

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupViews()
    }

    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
    }

    override public func awakeFromNib() {
        super.awakeFromNib()
        setupViews()
    }

    override public func becomeFirstResponder() -> Bool {
        // Hack to prevent text from getting cleared when switching secure entry
        // https://stackoverflow.com/a/49771445/1417922
        let success = super.becomeFirstResponder()
        if self.isSecureTextEntry, let text = self.text {
            self.text?.removeAll()
            self.insertText(text)
        }
        return success
    }
}

// MARK: UITextFieldDelegate needed calls
// Implement UITextFieldDelegate when you use this, and forward these calls to this class!
extension HideShowPasswordTextField {
    @objc func passwordTextBlur(_ textField: UITextField) {
        let onBlurCallback = self.onBlur;
        if((onBlurCallback) != nil) {
            onBlurCallback!(["value": self.text! as String])
        }
    }
    @objc func passwordTextFocus(_ textField: UITextField) {
        let onFocusCallback = self.onFocus;
        if((onFocusCallback) != nil) {
            onFocusCallback!(["value": self.text! as String])
        }
    }
    @objc func passwordTextReturn(_ textField: UITextField) {
        let _ = self.resignFirstResponder()
    }
}

// MARK: PasswordToggleVisibilityDelegate
extension HideShowPasswordTextField: PasswordToggleVisibilityDelegate {
    func viewWasToggled(_ passwordToggleVisibilityView: PasswordToggleVisibilityView, isSelected selected: Bool) {
        // hack to fix a bug with padding when switching between secureTextEntry state
        let hackString = self.text
        self.text = " "
        self.text = hackString

        // hack to save our correct font.  The order here is VERY finicky
        self.isSecureTextEntry = !selected

        var fontSize = 15

        if (self.inputStyle != nil) {
            if((self.inputStyle!["fontSize"]) != nil) {
                fontSize = Int(truncating: self.inputStyle!["fontSize"] as! NSNumber)
            }
        }

        let customFont:UIFont = UIFont.systemFont(ofSize: CGFloat(fontSize), weight: UIFont.Weight.regular)
        self.font = customFont
    }
}

// MARK: Control events
extension HideShowPasswordTextField {
    @objc func passwordTextChanged(_ sender: AnyObject) {
//        if let password = self.text {
//            passwordToggleVisibilityView.checkmarkVisible = passwordDelegate?.isValidPassword(password) ?? false
//        } else {
//            passwordToggleVisibilityView.checkmarkVisible = false
//        }
        let onChangeCallback = self.onChange;
        if((onChangeCallback) != nil) {
            onChangeCallback!(["value": self.text! as String])
        }
    }
}

// MARK: Private helpers
extension HideShowPasswordTextField {
    fileprivate func setupViews() {
        let toggleFrame = CGRect(x: 0, y: 0, width: 66, height: frame.height)
        passwordToggleVisibilityView = PasswordToggleVisibilityView(frame: toggleFrame)
        passwordToggleVisibilityView.delegate = self
//        passwordToggleVisibilityView.checkmarkVisible = false
        self.keyboardType = .asciiCapable
        self.rightView = passwordToggleVisibilityView
        self.addTarget(self, action: #selector(HideShowPasswordTextField.passwordTextChanged(_:)), for: .editingChanged)
        self.addTarget(self, action: #selector(HideShowPasswordTextField.passwordTextBlur(_:)), for: .editingDidEnd)
        self.addTarget(self, action: #selector(HideShowPasswordTextField.passwordTextFocus(_:)), for: .editingDidBegin)
        self.addTarget(self, action: #selector(HideShowPasswordTextField.passwordTextReturn(_:)), for: UIControl.Event.primaryActionTriggered)
        // if we don't do this, the eye flies in on textfield focus!
//        self.rightView?.frame = self.rightViewRect(forBounds: self.bounds)

//        self.rightViewMode = .whileEditing
        // left view hack to add padding
//        self.leftView = UIView(frame: CGRect(x: 0, y: 0, width: 10, height: 3))
//        self.leftViewMode = .always
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
