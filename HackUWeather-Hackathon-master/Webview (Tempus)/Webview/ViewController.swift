//
//  ViewController.swift
//  Webview
//
//  Created by Keshav on 2016-09-24.
//  Copyright © 2016 Keshav. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    @IBOutlet var WebView: UIWebView!
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup  after loading the view, typically from a nib.
        LoadAddressURL()
        
        
      
    }
    
    override var prefersStatusBarHidden: Bool {
        get {
            return true
        }  
    }
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    
    }
    
    func LoadAddressURL() {
        let url = URL(string: "http://10.0.1.64:800/tempus/mobile")!
        WebView.loadRequest(URLRequest(url: url))
    }

        
    
    
       
    


}

