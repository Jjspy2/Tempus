//
//  ViewController2.swift
//  Webview
//
//  Created by Keshav Chawla on 9/25/16.
//  Copyright © 2016 Ivan. All rights reserved.
//

import UIKit

class ViewController2: UIViewController {

    @IBOutlet weak var WebView2: UIWebView!
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

        // Dispose of any resources that can be recreated.
        

    
    func LoadAddressURL() {
        let url = URL(string: "http://10.0.1.64:800/tempus/mobile")!
        WebView2.loadRequest(URLRequest(url: url))
    }
    
    
    
    

}
