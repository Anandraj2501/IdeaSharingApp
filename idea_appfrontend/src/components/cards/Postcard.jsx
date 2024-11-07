import * as React from 'react';

export default function SpacingGrid() {
    return (
        <>
            <div className="container text-center">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="row">
                            <div className="col-lg-3">
                                <aside className='sidebar static left'>
                                    <div className="widget">
                                        <h4>hello</h4>
                                        <div className='your-page'>
                                            <figure><a href="#">pic</a></figure>
                                            <div className="page-publish">
                                                hello
                                            </div>
                                        </div>
                                        <div className='your-page'></div>
                                    </div>
                                </aside>
                            </div>
                            <div className="col-lg-6">col-48</div>
                            <div className="col-lg-3">col-8</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
