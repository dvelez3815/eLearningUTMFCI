
export function Footer() {
    return (
        <footer className="relative bg-gray-800 pt-8 pb-6 py-10">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap text-left lg:text-left">
                    <div className="w-full lg:w-6/12 px-4">
                        <h4 className="text-2xl fonat-semibold text-gray-100">TECHNICAL UNIVERSITY OF MANABI</h4>
                        <h5 className="text-lg mt-0 mb-2 text-gray-100">
                            
                        </h5>
                        <div className="mt-6 lg:mb-0 mb-6">
                            <button className="bg-white text-gray-100 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                                <i className="fab fa-twitter"></i></button><button class="bg-white text-lightBlue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                                <i className="fab fa-facebook-square"></i></button><button class="bg-white text-pink-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                                <i className="fab fa-dribbble"></i></button><button class="bg-white text-blueGray-800 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                                <i className="fab fa-github"></i>
                            </button>
                        </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                        <div className="flex flex-wrap items-top mb-6">
                            <div className="w-full lg:w-4/12 px-4 ml-auto">
                            <span className="block uppercase text-gray-100 text-sm font-semibold mb-2">DEVELOPING</span>
                                
                                <ul className="list-unstyled">
                                    <li>
                                         <a className="text-gray-100 hover:text-blueGray-800  block pb-2 text-sm" href="https://creative-tim.com/privacy?ref=njs-profile">Faculty of Informatics Sciences UTM</a>
                                    </li>
                                </ul>
                            
                            </div>
                            <div className="w-full lg:w-4/12 px-4">
                                <ul className="list-unstyled">
                                <span className="block uppercase text-gray-100 text-sm font-semibold mb-2">Content</span>
                                
                                    <li>
                                        <a className="text-gray-100 hover:text-blueGray-800  block pb-2 text-sm" href="https://github.com/creativetimofficial/notus-js/blob/main/LICENSE.md?ref=njs-profile">UTM Language Department</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-blueGray-300" />
                <div className="flex flex-wrap items-center md:justify-between justify-center">
                    <div className="w-full md:w-4/12 px-4 mx-auto text-center">
                        <div className="text-sm text-gray-100 font-semibold py-1">
                            Copyright © <span id="get-current-year">2021</span><a href="https://www.creative-tim.com/product/notus-js" class="text-blueGray-500 hover:text-gray-800" target="_blank" /> 
                            <a href="https://www.creative-tim.com?ref=njs-profile" class="text-blueGray-500 hover:text-blueGray-800"></a>.
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
export default Footer;