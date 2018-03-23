import React, { Component } from 'react';
import {
    Card,
    Icon,
    Popconfirm,
    message
} from 'antd';
import { connect } from 'react-redux';
import * as actions from '../../state/Products/actions';

class ProductsInformation extends Component {

    deleteProduct = (id, category) => {
        const { productsCategory } = this.props;
        const newProductsCategory = [...productsCategory];
        let indexOfProduct;

        newProductsCategory.forEach(function (element) {
            if (element.category === category) {
                indexOfProduct = element.products.findIndex(i => i.id === id);
                element.products.splice(indexOfProduct, 1);
            }
        });

        this.props.deleteProduct(newProductsCategory);

        message.success('The product has been successfully removed');
    }

    render() {
        return (
            <div className="contentProduct">
                <Card title={this.props.product.name}
                    style={{ width: 300, display: 'inline-block', margin: 5 }}
                    actions={[<Popconfirm
                        title="Are you sure delete this product?"
                        onConfirm={() => this.deleteProduct(this.props.product.id, this.props.product.category)}
                        okText="Yes" cancelText="No">
                        <Icon type="delete" title="Delete" />
                    </Popconfirm>,
                    <Icon type="edit" onClick={() => this.props.openModal(this.props.product, "Modify Product", "block", "modify")} title="Edit" />,
                    <Icon type="ellipsis" onClick={() => this.props.openModal(this.props.product, "Product Information", "none", "")} title="More information" />
                    ]}>
                    <div className="custom-image">
                        <img alt={this.props.product.category} width="100%" src={this.props.product.image} className="imgProduct" />
                    </div>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = state => (
    {
        productsCategory: state.products.productsCategory
    }
)

export default connect(mapStateToProps, actions)(ProductsInformation);