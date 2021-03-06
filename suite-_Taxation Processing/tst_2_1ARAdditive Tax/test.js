function main()
{
    //-----includes-----
    source(findFile("scripts","functions.js"));
    
    //-----login Application-----
    loginAppl("CONFIGURE"); 
    
    //---find Application Edition------
    try
    {
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
        activateItem(":xTuple ERP: *_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: *._System_QMenu", "Setup...");
        activateItem(":xTuple ERP: *._System_QMenu", "Setup...");
        waitForObject(":Configure.Database_QModelIndex");
        mouseClick(":Configure.Database_QModelIndex", 0, 0, 0, Qt.LeftButton);
        
        if(findObject(":Setup._tree_XTreeWidget").itemsExpandable==true)
        {
            waitForObject(":Configure.Database_QModelIndex");
            mouseClick(":Configure.Database_QModelIndex", 0, 0, 0, Qt.LeftButton);
        }
        else
        {
            waitForObject(":_tree.Configure_QModelIndex");
            mouseClick(":_tree.Configure_QModelIndex",0, 0, 0, Qt.LeftButton);
            waitForObject(":Configure.Database_QModelIndex");
            mouseClick(":Configure.Database_QModelIndex", 0, 0, 0, Qt.LeftButton); 
        }
        
        waitForObject(":Database Information.*_QLabel");
        var appEdition = findObject(":Database Information.*_QLabel").text;
        
        if(object.exists(":_stack.Use toolbars on displays when available_QCheckBox"))
        {
            waitForObject(":_stack.Use toolbars on displays when available_QCheckBox");
            if(!findObject(":_stack.Use toolbars on displays when available_QCheckBox").checked)
                clickButton(":_stack.Use toolbars on displays when available_QCheckBox");
        }
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in identifying the application edition" + e);       
        
    }
//    //--------------- Set the window to Tab view mode -------------
//    tabView();
//    
    //-------New  Chart of Account for Tax Liablities -------
    try{
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Account");
        activateItem(":xTuple ERP: *.Accounting_QMenu", "Account");
        waitForObjectItem(":xTuple ERP:*.Account_QMenu", "Chart of Accounts...");
        activateItem(":xTuple ERP:*.Account_QMenu", "Chart of Accounts...");
        COA("01","01","2351","01","Tax Liabilty Type2 Zone2","Liability","CL");
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        test.log("New chart of accout created");
    }
    catch(e)
    {
        test.fail("Error in creating chart account  for the Tax Liability ");
    }
  
    //----- New Tax Authority creation -------
    
    taxAuthority(2);
    //---- Tax Zone Creation -------
    taxZone(2);
    //---- Tax Class Creation ------
    taxClass(2,1);
    
    //-------------- Tax Code creation for 10% -------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Tax");
        activateItem(":xTuple ERP: *.Accounting_QMenu", "Tax");
        waitForObjectItem(":xTuple ERP:*.Tax_QMenu", "Tax Codes...");
        activateItem(":xTuple ERP:*.Tax_QMenu", "Tax Codes...");
        waitForObject(":xTuple ERP:*.New_QPushButton");
        clickButton(":xTuple ERP:*.New_QPushButton");
        waitForObject(":_code_XLineEdit_2");
        type(":_code_XLineEdit_2", "Code 2");
        waitForObject(":_description_XLineEdit_5");
        type(":_description_XLineEdit_5", "Tax Code 2");
        waitForObject(":Tax Code.VirtualClusterLineEdit_GLClusterLineEdit");
        type(":Tax Code.VirtualClusterLineEdit_GLClusterLineEdit", "01-01-2351-01");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":Tax Code._taxClass_XComboBox");
        clickItem(":Tax Code._taxClass_XComboBox", "Class 2-Tax Class 2", 0, 0, 5, Qt.LeftButton);
        snooze(0.5);
        waitForObject(":Tax Code._taxauth_XComboBox");
        clickItem(":Tax Code._taxauth_XComboBox", "AUTHORITY 2", 0, 0, 5, Qt.LeftButton);
        waitForObject(":_frame.New_QPushButton");
        clickButton(":_frame.New_QPushButton");
        snooze(1);
        waitForObject(":_rateGroup._percent_XLineEdit");
        type(":_rateGroup._percent_XLineEdit", "10");
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        waitForObject(":Cash Receipt.Save_QPushButton_3");
        clickButton(":Cash Receipt.Save_QPushButton_3");
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        test.log("Tax Code for 10% is created");
    }
    catch(e)
    {
        test.fail("Error in creating tax code" + e);
    }
    //------------- Tax Type creation -------------
    taxType(2);
    
    //-------- Tax Assignment creation ----------------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Tax");
        activateItem(":xTuple ERP: *.Accounting_QMenu", "Tax");
        waitForObjectItem(":xTuple ERP:*.Tax_QMenu", "Tax Assignments...");
        activateItem(":xTuple ERP:*.Tax_QMenu", "Tax Assignments...");
        waitForObject(":xTuple ERP:*.New_QPushButton");
        clickButton(":xTuple ERP:*.New_QPushButton");
        waitForObject(":Tax Assignment._taxZone_XComboBox");
        clickItem(":Tax Assignment._taxZone_XComboBox","ZONE 2-Tax Zone 2",0, 0, 5, Qt.LeftButton);
        waitForObject(":Tax Assignment._taxType_XComboBox");
        clickItem(":Tax Assignment._taxType_XComboBox","Type 2",0, 0, 5, Qt.LeftButton);
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":_frame._taxCodeOption_XTreeWidget");
        clickItem(":_frame._taxCodeOption_XTreeWidget", "Code 1", 0, 0, 5, Qt.LeftButton);
        snooze(0.5);
        waitForObject(":_frame.Add->_QPushButton");
        clickButton(":_frame.Add->_QPushButton");
        snooze(0.5);
        waitForObject(":_frame._taxCodeOption_XTreeWidget");
        clickItem(":_frame._taxCodeOption_XTreeWidget", "Code 2", 0, 0, 5, Qt.LeftButton);
        snooze(0.5);
        waitForObject(":_frame.Add->_QPushButton");
        clickButton(":_frame.Add->_QPushButton");
        waitForObject(":Sales Order.Close_QPushButton");
        clickButton(":Sales Order.Close_QPushButton");
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        test.log("Tax Assignment is created");
    }
    
    catch(e)
    {
        test.fail("Error in creating tax assignment" + e);
    }
    
    snooze(3);
    //--------Copy YTRUCK1-----
    
    copyItem("YTRUCK1","TAXTRUCK 2");
    createRIS("TAXTRUCK 2");
    
    
    
    //    //------ Assiging Item to the TAX TYPE -----
    assignTaxType("TAXTRUCK 2",2);
    
    //-------------Creating Customer--------
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Customer");
        activateItem(":xTuple ERP: *.Sales_QMenu", "Customer");
        waitForObjectItem(":xTuple ERP: *.Customer_QMenu", "New...");
        activateItem(":xTuple ERP: *.Customer_QMenu", "New...");
        waitForObject(":Cash Receipt.VirtualClusterLineEdit_CLineEdit");
        type(":Cash Receipt.VirtualClusterLineEdit_CLineEdit", "Customer 2");
        waitForObject(":xTuple ERP:*._name_XLineEdit");
        type(":xTuple ERP:*._name_XLineEdit", "Customer with tax 5+10");
        
        
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Settings");
        snooze(0.5);
        nativeType("<Tab>");
        waitForObject(":_defaultGroup._salesrep_XComboBox");
        if(findObject(":_defaultGroup._salesrep_XComboBox").currentText!= "1000-Sam Masters")
            clickItem(":_defaultGroup._salesrep_XComboBox","1000-Sam Masters",0,0,1,Qt.LeftButton);
//        if(findObject(":_defaultGroup._salesrep_XComboBox").currentText!= "SMASTERS-Sam Masters")
//            clickItem(":_defaultGroup._salesrep_XComboBox","SMASTERS-Sam Masters",0,0,1,Qt.LeftButton);
        waitForObject(":_settingsTab.Tax_QRadioButton");
        clickButton(":_settingsTab.Tax_QRadioButton");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":_settingsStack._taxzone_XComboBox");
        clickItem(":_settingsStack._taxzone_XComboBox","ZONE 2-Tax Zone 2",0, 0, 5, Qt.LeftButton);
        snooze(0.5);
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Addresses");
        
        waitForObject(":_addressTab.Ship To_QRadioButton");
        clickButton(":_addressTab.Ship To_QRadioButton");
        snooze(0.5);
        waitForObject(":_addressStack.New_QPushButton");
        clickButton(":_addressStack.New_QPushButton");
        snooze(1)
        if(!findObject(":Ship-To.Active_QCheckBox").checked)
            clickButton(":Ship-To.Active_QCheckBox");
        if(!findObject(":Ship-To.Default_QCheckBox").checked)
            clickButton(":Ship-To.Default_QCheckBox");
        waitForObject(":_shipToNumber_XLineEdit");
        type(":_shipToNumber_XLineEdit", "Store1");
        waitForObject(":_name_XLineEdit_3");
        type(":_name_XLineEdit_3", "Store1");
        waitForObject(":Defaults:._taxzone_XComboBox");
        clickItem(":Defaults:._taxzone_XComboBox","ZONE 2-Tax Zone 2",0, 0, 5, Qt.LeftButton);
        waitForObject(":Select Order for Billing.Save_QPushButton_2");
        clickButton(":Select Order for Billing.Save_QPushButton_2");
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        waitForObject(":Sales Order.Cancel_QPushButton");
        clickButton(":Sales Order.Cancel_QPushButton");
        test.log("Customer Record is created");
    }
    catch(e)
    {
        test.fail("Error in creating customer" + e);
    }
    //----- Expense Category Creation ---------
    try{
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Setup...");
        activateItem(":xTuple ERP: *.Accounting_QMenu", "Setup...");
        waitForObject(":Accounting Mappings.Expense Categories_QModelIndex");
        mouseClick(":Accounting Mappings.Expense Categories_QModelIndex", 23, 8, 0, Qt.LeftButton);
        waitForObject(":_stack.New_QPushButton");
        clickButton(":_stack.New_QPushButton");
        waitForObject(":_category_XLineEdit");
        type(":_category_XLineEdit", "TAXZONE 2- TYPE 2");
        waitForObject(":_description_XLineEdit");
        type(":_description_XLineEdit", "TAXZONE 2- TYPE 2");
        waitForObject(":_stack.VirtualClusterLineEdit_GLClusterLineEdit");
        type(":_stack.VirtualClusterLineEdit_GLClusterLineEdit", "01-01-2350-01");
        nativeType("<Tab>");
        waitForObject(":_stack_QLabel_2");
        type(":_stack.VirtualClusterLineEdit_GLClusterLineEdit_2", "01-01-6550-01");
        nativeType("<Tab>");
        waitForObject(":_stack_QLabel_3");
        type(":_stack.VirtualClusterLineEdit_GLClusterLineEdit_3", "01-01-2460-01");
        nativeType("<Tab>");
        waitForObject(":_stack_QLabel_4");
        type(":_stack.VirtualClusterLineEdit_GLClusterLineEdit_4", "01-01-6550-01");
        nativeType("<Tab>");
        waitForObject(":Cash Receipt.Save_QPushButton_3");
        clickButton(":Cash Receipt.Save_QPushButton_3");
        waitForObject(":_stack._expcat_XTreeWidget");
        if (object.exists("{column='0' container=':_stack._expcat_XTreeWidget' text='TAXZONE 2- TYPE 2' type='QModelIndex'}"))            test.pass("TAXZONE 2-TYPE 2 Expense Category Created");
        else
            test.fail("TAXZONE 2-TYPE 2 Expense Category Not Created");
        
        waitForObject(":_stack.New_QPushButton");
        clickButton(":_stack.New_QPushButton");
        waitForObject(":_category_XLineEdit");
        type(":_category_XLineEdit", "VENDOR_TAX_PAID_TYPE 2");
        waitForObject(":_description_XLineEdit");
        type(":_description_XLineEdit", "VENDOR_TAX_PAID_TYPE 2");
        waitForObject(":_stack.VirtualClusterLineEdit_GLClusterLineEdit");
        type(":_stack.VirtualClusterLineEdit_GLClusterLineEdit", "01-01-2460-01");
        nativeType("<Tab>");
        waitForObject(":_stack_QLabel_2");
        type(":_stack.VirtualClusterLineEdit_GLClusterLineEdit_2", "01-01-6550-01");
        nativeType("<Tab>");
        waitForObject(":_stack_QLabel_3");
        type(":_stack.VirtualClusterLineEdit_GLClusterLineEdit_3", "01-01-2460-01");
        nativeType("<Tab>");
        waitForObject(":_stack_QLabel_4");
        type(":_stack.VirtualClusterLineEdit_GLClusterLineEdit_4", "01-01-6550-01");
        nativeType("<Tab>");
        waitForObject(":Cash Receipt.Save_QPushButton_3");
        clickButton(":Cash Receipt.Save_QPushButton_3");
        waitForObject(":_stack._expcat_XTreeWidget");
        if (object.exists("{column='0' container=':_stack._expcat_XTreeWidget' text='VENDOR_TAX_PAID_TYPE 2' type='QModelIndex'}"))            test.pass("TAXZONE 2-TYPE 2 Expense Category Created");
        else
            test.fail("TAXZONE 2-TYPE 2 Expense Category Not Created");
        
        waitForObject(":Cash Receipt.Save_QPushButton_3");
        clickButton(":Cash Receipt.Save_QPushButton_3");
    }
    catch(e)
    {
        test.fail("Error in creating Expense Categories"+e);
    }
    //--------- Sales Order Creation -------
    
    var sonumber2 = createSalesOrder1("TAXTRUCK 2", "100","CUSTOMER 2");
    //------ Verifying the Tax amount calculted ----------
    try{
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
        activateItem(":xTuple ERP: *.Sales_QMenu", "Sales Order");
        waitForObjectItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
        activateItem(":xTuple ERP: *.Sales Order_QMenu", "List Open...");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        waitForObject(":_list_XTreeWidget_3");
        openItemContextMenu(":_list_XTreeWidget_5",sonumber2, 5, 5, Qt.LeftButton);  
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Edit...");
        snooze(0.5);
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
        var sotaxamt2 = findObject(":_lineItemsPage.XLineEdit_XLineEdit_4").text;
        sotaxamt2 = replaceSubsting(sotaxamt2);
        var sosubtot2 = findObject(":_lineItemsPage.XLineEdit_XLineEdit_5").text;
        sosubtot2 = replaceSubsting(sosubtot2);
        if(sotaxamt2 == sosubtot2*15/100)
            test.pass("Tax (ADDITIVE TAX)amount calculted correctly for the sales order");
        else
            test.fail("Incorrect Tax(ADDITIVE TAX) amount is calculated for the sales order");
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in finding the tax amount"+e);
    }
    
    
    //-----Issue Stock to Shipping-----
    try
    {       
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Shipping");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Shipping");
        waitForObjectItem(":xTuple ERP: *.Shipping_QMenu", "Issue to Shipping...");
        activateItem(":xTuple ERP: *.Shipping_QMenu", "Issue to Shipping...");
        
        waitForObject(":_stackedWidget.VirtualClusterLineEdit_OrderLineEdit");
        type(":_stackedWidget.VirtualClusterLineEdit_OrderLineEdit", sonumber2);
        snooze(0.5);
        nativeType("<Tab>");
        
        waitForObject(":_frame.Issue All_QPushButton");
        clickButton(":_frame.Issue All_QPushButton");
        
      
        //-----Ship the Sales Order (with'Select for Billing' option checked)-----
        waitForObject(":Issue to Shipping.Ship_QPushButton");
        clickButton(":Issue to Shipping.Ship_QPushButton");
        
        if(findObject(":groupBox.Select for Billing_QCheckBox").unchecked)
            clickButton(":groupBox.Select for Billing_QCheckBox");
        
        if(findObject(":groupBox.Create and Print Invoice_XCheckBox_3").checked)
            clickButton(":groupBox.Create and Print Invoice_XCheckBox_3");
        
        if(findObject(":groupBox.Print Packing List_XCheckBox_3").checked)
            clickButton(":groupBox.Print Packing List_XCheckBox_3");
        
        waitForObject(":Issue to Shipping.Ship_QPushButton_2");
        clickButton(":Issue to Shipping.Ship_QPushButton_2");
        
        waitForObject(":Issue to Shipping.Close_QPushButton");
        clickButton(":Issue to Shipping.Close_QPushButton");
        test.log("Stock issued to the SO and it is shipped");
    }
    catch(e)
    {
        test.fail("Error in issuing stock and shipping the sales order" + e);
    }
    //-----Creating Invoices-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Billing");
        activateItem(":xTuple ERP: *.Sales_QMenu", "Billing");
        waitForObjectItem(":xTuple ERP: *.Billing_QMenu", "Invoice");
        activateItem(":xTuple ERP: *.Billing_QMenu", "Invoice");
        waitForObjectItem(":xTuple ERP: *.Invoice_QMenu", "Create Invoices...");
        activateItem(":xTuple ERP: *.Invoice_QMenu", "Create Invoices...");
        waitForObject(":Create Invoices.Create Invoices_QPushButton");
        clickButton(":Create Invoices.Create Invoices_QPushButton");
        test.log("Invoice created successfully");
    }
    catch(e)
    {
        test.fail("Error in creating invoices" + e);
    }
    
  
    //-----Posting Invoices-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales");
        activateItem(":xTuple ERP: *_QMenuBar", "Sales");
        waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Billing");
        activateItem(":xTuple ERP: *.Sales_QMenu", "Billing");
        waitForObjectItem(":xTuple ERP: *.Billing_QMenu", "Invoice");
        activateItem(":xTuple ERP: *.Billing_QMenu", "Invoice");
        type(":xTuple ERP: *.Billing_QMenu","<Right>");
        waitForObjectItem(":xTuple ERP: *.Invoice_QMenu", "List Unposted Invoices...");
        activateItem(":xTuple ERP: *.Invoice_QMenu", "List Unposted Invoices...");
        snooze(0.5);
        waitForObject(":_list_XTreeWidget_3");
        openItemContextMenu(":_list_XTreeWidget_3", sonumber2 ,5, 5, Qt.LeftButton);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Edit...");
        snooze(2);
        var invnum2 = findObject(":_invoiceNumber_XLineEdit").text;
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
        
        var invsubtot2 = findObject(":xTuple ERP:*.XLineEdit_XLineEdit").text;
        var invtaxamt2 = findObject(":lineItemsTab.XLineEdit_XLineEdit").text;
        invtaxamt2 = replaceSubsting(invtaxamt2);
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton"); 
        waitForObject(":_list_XTreeWidget_3");
        openItemContextMenu(":_list_XTreeWidget_3", sonumber2 ,5, 5, Qt.LeftButton);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Post...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Post...");
        snooze(1);

        waitForObject(":List Unposted Invoices.Continue_QPushButton");
        clickButton(":List Unposted Invoices.Continue_QPushButton");
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        if(invtaxamt2 == sotaxamt2)
            test.pass("Invoice Tax amount is Equal to the Sales Order tax amount");
        else
            test.fail("Invoice Tax amount is Not-Equal to the Sales Order tax amount");
        
    }
    catch(e)
    {
        test.fail("Error in posting invoices" + e);
    }
    //-------- G/L Verification for Incoice--------------
    bool = glTaxTransactions(/01-01-2351-01/, invnum2);
    if(bool == 1)
    {
        test.pass("Invoice " + invnum2 + " has a G/L entry for its tax amount");
    }
    else
        test.fail("No GL entry is made for invoice " + invnum2+"");
    //-----Tax History Verification for Invoice-----------
    
    bool = taxHistory(invnum2);
    if(bool == 1)
    {
        test.pass("Invoice " + invnum2 + " has a Tax History entry for its tax amount");
    }
    else
        test.fail("No Tax History is available for the "+ invnum2+" invoice tax amount");
    
 
    //--------- Creating A/R Misc.Credit Memo ----------
    try{
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Receivable");
        activateItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Receivable");
        waitForObjectItem(":xTuple ERP: *.Accounts Receivable_QMenu", "Memos");
        activateItem(":xTuple ERP: *.Accounts Receivable_QMenu", "Memos");
        waitForObjectItem(":xTuple ERP:*.Memos_QMenu", "List Unapplied Credit Memos...");
        activateItem(":xTuple ERP:*.Memos_QMenu", "List Unapplied Credit Memos...");
        waitForObject(":xTuple ERP:*.New_QPushButton");
        clickButton(":xTuple ERP:*.New_QPushButton");
        waitForObject(":Cash Receipt.VirtualClusterLineEdit_CLineEdit");
        type(":Cash Receipt.VirtualClusterLineEdit_CLineEdit", "CUSTOMER 2");
        nativeType("<Tab>");
        var arcmnum2 = findObject(":_docGroup._docNumber_XLineEdit_3").text;
        waitForObject(":xTuple ERP:*.XDateEdit_XDateEdit");
        type(":xTuple ERP:*.XDateEdit_XDateEdit", "0");
        nativeType("<Tab>");
        nativeType("<Tab>");
        waitForObject(":_amountGroup.XLineEdit_XLineEdit");
        type(":_amountGroup.XLineEdit_XLineEdit", "1400");
        nativeType("<Tab>");
        waitForObject(":_docGroup._rsnCode_XComboBox");
        clickItem(":_docGroup._rsnCode_XComboBox","SO-DAMAGED-RETURNED-SO Damaged - Returned on CM",0, 0, 5, Qt.LeftButton);  
        waitForObject(":_amountGroup.Tax:_XURLLabel");
        mouseClick(":_amountGroup.Tax:_XURLLabel", 65, 16, 0, Qt.LeftButton);
        snooze(0.5);
        waitForObject(":_frame.New_QPushButton_3");
        clickButton(":_frame.New_QPushButton_3");
        snooze(0.5);
        waitForObject(":_taxcode_XComboBox");
        clickItem(":_taxcode_XComboBox","Code 2-Tax Code 2",0, 0, 1, Qt.LeftButton);  
        snooze(0.5);
        waitForObject(":Cash Receipt.XLineEdit_XLineEdit_2");
        type(":Cash Receipt.XLineEdit_XLineEdit_2", "150");
        snooze(0.5);
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        waitForObject(":Tax Detail.Close_QPushButton");
        clickButton(":Tax Detail.Close_QPushButton");
        waitForObject(":A/R Open Item - Enter Misc. Credit Memo.Post_QPushButton");
        clickButton(":A/R Open Item - Enter Misc. Credit Memo.Post_QPushButton");
        waitForObject(":A/R Open Item - Enter Misc. Credit Memo.Cancel_QPushButton");
        clickButton(":A/R Open Item - Enter Misc. Credit Memo.Cancel_QPushButton");
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        test.log("A/R Misc.Credit Memo created and posted successfully");
    }
    catch(e)
    {
        test.fail("Error in Creating/Posting A/R Misc.Credit memo"+e);
    }
    //-------- G/L Verification for Misc.Credit Memo --------------
    bool = glTaxTransactions(/01-01-2351-01/, arcmnum2);
    if(bool == 1)
    {
        test.pass("misc.credit memo " + arcmnum2 + " has a G/L entry for its tax amount");
    }
    else
        test.fail("No GL entry is made for misc.credit memo" + arcmnum2+"");
    //-----Tax History Verification for A/R Misc.Credit Memo -----------
    
    bool = cmTaxHistory("Code 2");
    if(bool == 1)
    {
        test.pass("MIsc.Credit Memo" + arcmnum2 + " has a Tax History entry for its tax amount");
    }
    else
        test.fail("No Tax History is available for the "+arcmnum2+" Misc.Credit Memo");
 
}