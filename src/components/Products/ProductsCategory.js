import React, { Component } from 'react';
import {
    Tabs,
    Button,
    Icon
} from 'antd';
import ProductsInformation from './ProductsInformation';
import * as actions from '../../state/Products/actions';
import { connect } from 'react-redux';

const TabPane = Tabs.TabPane;

class ProductsCategory extends Component {

    componentWillMount(){
        this.props.loadProducts();
    }

    openModal = (category) => {
        const product = {
            id: Math.floor(Math.random() * 1000),
            category,
            name: "",
            price: 0,
            image: "",
        }
        this.props.openModal(category, product, "Add Product", "block", "add");
    }

    render() {
        return (
            <div className="contentProducts">
                <Tabs
                    defaultActiveKey="0"
                    tabPosition="left">
                    {this.props.productsCategory.map((item, index) =>
                        <TabPane tab={item.category} key={index}>
                            <Button
                                key="submit"
                                type="primary"
                                size="large"
                                onClick={() => this.openModal(item.category)}>
                                <Icon type="plus" /> Add {item.category}
                            </Button>
                            <br />
                            {item.products.map((product) =>
                                <ProductsInformation
                                    key={product.id}
                                    product={product}
                                    handleDelete={this.handleDeleteProduct}
                                    handleModify={this.handleModifyProduct}
                                />
                            )}
                        </TabPane>
                    )}
                </Tabs>
            </div>
        );
    }
}

const mapStateToProps = state => (
    {
        productsCategory: state.products.productsCategory
    }
)

export default connect(mapStateToProps, actions)(ProductsCategory);