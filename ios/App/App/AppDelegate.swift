import UIKit
import Capacitor
import FBSDKCoreKit
import TrustKit

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
    
    var window: UIWindow?
    var appSwitcherView: UIView?
    
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        // Override point for customization after application launch.
        self.checkDevice()
        self.checkClipboardChange()
        FBSDKCoreKit.ApplicationDelegate.shared.application(
            application,
            didFinishLaunchingWithOptions: launchOptions
        )
        self.setupTrustkit()
        return true
    }
    
    func applicationWillResignActive(_ application: UIApplication) {
        // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
        // Use this method to pause ongoing tasks, disable timers, and invalidate graphics rendering callbacks. Games should use this method to pause the game.
        
        // First apply the Gaussian blur on the screenshot of the current view.
        let blurredImage = applyGaussianBlur(on: createScreenshotOfCurrentContext() ?? UIImage(), withBlurFactor: 7.0)
        
        // Create the UIImageView for the blurred screenshot.
        appSwitcherView = UIImageView(image: blurredImage)
        
        // Set it as the current screen
        self.window?.addSubview(appSwitcherView!)
    }
    
    func applicationDidEnterBackground(_ application: UIApplication) {
        // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
        // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
    }
    
    func applicationWillEnterForeground(_ application: UIApplication) {
        // Called as part of the transition from the background to the active state; here you can undo many of the changes made on entering the background.
    }
    
    func applicationDidBecomeActive(_ application: UIApplication) {
        // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
        appSwitcherView?.removeFromSuperview()
    }
    
    func applicationWillTerminate(_ application: UIApplication) {
        // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
    }
    
    func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey: Any] = [:]) -> Bool {
        if (FBSDKCoreKit.ApplicationDelegate.shared.application(
            app,
            open: url,
            sourceApplication: options[UIApplication.OpenURLOptionsKey.sourceApplication] as? String,
            annotation: options[UIApplication.OpenURLOptionsKey.annotation]
        )) {
            return true;
        } else {
            return ApplicationDelegateProxy.shared.application(app, open: url, options: options)
        }
    }
    
    func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
        // Called when the app was launched with an activity, including Universal Links.
        // Feel free to add additional processing here, but if you want the App API to support
        // tracking app url opens, make sure to keep this call
        return ApplicationDelegateProxy.shared.application(application, continue: userActivity, restorationHandler: restorationHandler)
    }
    
    override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
        super.touchesBegan(touches, with: event)
        
        let statusBarRect = UIApplication.shared.statusBarFrame
        guard let touchPoint = event?.allTouches?.first?.location(in: self.window) else { return }
        
        if statusBarRect.contains(touchPoint) {
            NotificationCenter.default.post(name: .capacitorStatusBarTapped, object: nil)
        }
    }
    
    func checkDevice() {
        if let url = URL(string: "cydia://package/com.example.package"), UIApplication.shared.canOpenURL(url) {
            // Device is jailbroken
            print("Device is jailbroken")
            UIControl().sendAction(#selector(NSXPCConnection.suspend),
                                   to: UIApplication.shared, for: nil)
        } else {
            // Device is not jailbroken
            print("Device is not jailbroken")
        }
    }
    
    /// This method takes a screenshot of the currently shown view.
    /// Method returns nil if screenshot can't be taken.
    func createScreenshotOfCurrentContext() -> UIImage? {
        UIGraphicsBeginImageContext(self.window?.screen.bounds.size ?? CGSize())
        guard let currentContext = UIGraphicsGetCurrentContext() else {
            return nil
        }
        
        self.window?.layer.render(in: currentContext)
        
        let image = UIGraphicsGetImageFromCurrentImageContext()
        
        UIGraphicsEndImageContext()
        
        return image
    }
    
    /// This method applies a Gaussian blur on a given UIImage.
    /// - Parameters:
    ///   - image: The image where the Gaussian blur will be applied on
    ///   - blurFactor: How high should the blur effect be
    func applyGaussianBlur(on image: UIImage, withBlurFactor blurFactor : CGFloat) -> UIImage? {
        guard let inputImage = CIImage(image: image) else {
            return nil
        }
        
        // Add a comment where to find documentation for that
        let gaussianFilter = CIFilter(name: "CIGaussianBlur")
        gaussianFilter?.setValue(inputImage, forKey: kCIInputImageKey)
        gaussianFilter?.setValue(blurFactor, forKey: kCIInputRadiusKey)
        
        guard let outputImage = gaussianFilter?.outputImage else {
            return nil
        }
        
        return UIImage(ciImage: outputImage)
    }
}

extension UITextField {
    open override func canPerformAction(_ action: Selector, withSender sender: Any?) -> Bool {
        switch action {
        case #selector(UIResponderStandardEditActions.paste(_:)):
            return false
            
        case #selector(UIResponderStandardEditActions.copy(_:)):
            return false
            
        case #selector(UIResponderStandardEditActions.cut(_:)):
            return false
            
        default:
            return super.canPerformAction(action, withSender: sender)
        }
    }
}

// MARK: - UIPasteboard fixxing
extension AppDelegate {
    func checkClipboardChange() {
        NotificationCenter.default.addObserver(self, selector: #selector(clipboardChanged), name: UIPasteboard.changedNotification, object: nil)
    }
    
    @objc func clipboardChanged(){
        let pasteboardString: String? = UIPasteboard.general.string
        if let _ = pasteboardString {
            //            print("String is \(theString)")
            UIPasteboard.general.items = []
        }
    }
}

// MARK: - trustkit
extension AppDelegate {
    func setupTrustkit() {
        let webChisDomainPublicKey = "98G5NBTBZiyJlS5HweFYN5QmXgIbk15AoEP3U0SKtAQ=" // From Web Domain Chis
//        let serverSidePublicKey = "9YOIfc8bRYx79LCLkG/sxZbjuGAPJe+Wy9Kga8qoXG4=" // Server Side Key
//        let secondPublicKey = "4a6cPehI7OG6cuDZka5NDZ7FR8a60d3auda+sKfg4Ng="
        let userTrustRSACertKey = "x4QzPSC810K5/cMjb05Qm4k3Bw5zBn4lTdO/nEW/Td4="
        let pinnedDomain = "https://chiscustomer.bakco.vn"

        TrustKit.setLoggerBlock { (message) in
            print("TrustKit log: \(message)")
        }
        let trustKitConfig: [String: Any] = [
            kTSKSwizzleNetworkDelegates: false,
            kTSKPinnedDomains: [
                pinnedDomain: [
                    kTSKEnforcePinning: true,
                    kTSKIncludeSubdomains: true,
                    kTSKPublicKeyHashes: [
                        //First public key -> Obtained from the Python script
                        userTrustRSACertKey,
                        //Second public key in case of the first one will expire
                        webChisDomainPublicKey
                    ],
                    kTSKReportUris:        ["https://overmind.datatheorem.com/trustkit/report"],
                ]
            ]]
        TrustKit.initSharedInstance(withConfiguration: trustKitConfig)
    }
}

extension URLSession {
    func urlSession(_ session: URLSession, didReceive challenge: URLAuthenticationChallenge, completionHandler: @escaping (URLSession.AuthChallengeDisposition, URLCredential?) -> Void) {
        // Call into TrustKit here to do pinning validation
        if TrustKit.sharedInstance().pinningValidator.handle(challenge, completionHandler: completionHandler) == false {
            // TrustKit did not handle this challenge: perhaps it was not for server trust
            // or the domain was not pinned. Fall back to the default behavior
            completionHandler(.performDefaultHandling, nil)
        }
    }
//
//    static func isServerCertValid(_ challenge: URLAuthenticationChallenge) -> Bool {
//        guard let serverTrust = challenge.protectionSpace.serverTrust else {
//            return false
//        }
//
//        let pinningValidator = TrustKit.sharedInstance().pinningValidator
//        let trustDecision = pinningValidator.evaluateTrust(serverTrust, forHostname: "202.78.227.174")
//
//        return trustDecision == .shouldAllowConnection
//    }
}
