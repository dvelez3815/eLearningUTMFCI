
export function Footer() {
    return (
        <footer className="relative bg-gray-800 ">
            <div className="container mx-auto px-4 ">
                <div className="flex flex-wrap sm:text-left pt-8 sm:pl-8 text-center lg:text-left">
                    <div className="w-full md:w-6/12 lg:px-4">
                        <h4 className="text-lg font-semibold text-gray-100">TECHNICAL UNIVERSITY OF MANABI</h4>
                        <h5 className="text-xs mt-0 mb-2 text-gray-100">
                        LANGUAGE SELF-LEARNING SYSTEM 
                        </h5>
                        
                    </div>
                    <div className="w-full pt-2 md:pt-0 md:w-6/12 pl-4">
                        <div className="flex  items-top mb-6">
                            <div className="w-full pl-4 ml-auto">
                                <h4 className="text-xs font-semibold text-gray-100">DEVELOPING</h4>
                                <h5 className="text-xs mt-0 mb-2 text-gray-100">
                                Faculty of Informatics Sciences UTM
                                </h5>
      
                            
                            </div>
                            <div className="w-full px-4">
                                <h4 className="text-xs font-semibold text-gray-100">CONTENT</h4>
                                    <h5 className="text-xs mt-0 mb-2 text-gray-100">
                                    UTM Language Department
                                    </h5>
   
                            </div>
                        </div>
                    </div>
                </div>
                <hr className=" border-blueGray-300" />
                <div className="flex py-2 flex-wrap items-center md:justify-between justify-center">
                    <div className="w-full md:w-4/12 px-4 mx-auto text-center">
                        <div className="text-sm text-gray-100  py-1">
                            Copyright © <span id="get-current-year">2022</span>
                            <a href="https://www.creative-tim.com/product/notus-js" className="text-blueGray-500 hover:text-gray-800" target="_blank" rel="noreferrer">a</a> 
                            <a href="https://www.creative-tim.com?ref=njs-profile" className="text-blueGray-500 hover:text-blueGray-800">a</a>.
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
export default Footer;