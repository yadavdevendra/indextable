import { IndexTable, Card, useIndexResourceState, Text, Button, Modal, TextContainer, Page } from '@shopify/polaris';
import React, { useEffect, useState } from 'react';

function Home() {
    const [data, setData] = useState([])
    const [newdata, setNewdata] = useState([])
    const [active, setActive] = useState(false)
    const [buttonshow, setButtonshow] = useState(false)
    const [openmodel, setOpenmodel] = useState(false)
    const customers = [
        {
            id: '3411',
            url: 'customers/341',
            name: 'Mae Jemison',
            location: 'Decatur, USA',
            orders: 20,
            amountSpent: '$2,400',
        },
        {
            id: '2561',
            url: 'customers/256',
            name: 'Ellen Ochoa',
            location: 'Los Angeles, USA',
            orders: 30,
            amountSpent: '$140',
        },
    ];
    const resourceName = {
        singular: 'customer',
        plural: 'customers',
    };

    const { selectedResources, allResourcesSelected, handleSelectionChange } =
        useIndexResourceState(customers);

    // console.log(selectedResources.length === customers.length) outpute is true/false
  

    const rowMarkup = customers.map(
        ({ id, name, location, orders, amountSpent }, index) => (
            <IndexTable.Row
                id={id}
                key={id}
                selected={selectedResources.includes(id)}
                position={index}

            >
                <IndexTable.Cell>
                    <Text variant="bodyMd" fontWeight="bold" as="span">
                        {name}
                    </Text>
                </IndexTable.Cell>
                <IndexTable.Cell>{location}</IndexTable.Cell>
                <IndexTable.Cell>{orders}</IndexTable.Cell>
                <IndexTable.Cell>{amountSpent}</IndexTable.Cell>
                <IndexTable.Cell> <Button onClick={(e) => {
                    e.stopPropagation()
                    setData({ id, name, location, orders, amountSpent })
                    setActive(true)
                }}>View</Button></IndexTable.Cell>
            </IndexTable.Row>
        ),
    );

    function handlechange() {

        setNewdata(customers)
        setOpenmodel(true)
    }
    useEffect(() => {
        if (selectedResources.length === customers.length) {
            setButtonshow(true)
        }else{
            setButtonshow(false)
        }
    }, [selectedResources])
    // console.log("Data", data);
    // console.log("rowMarkup", rowMarkup);
    return (
        <Page fullWidth>
        <Card>
            {buttonshow && <div className='btn'><Button onClick={handlechange}>View All</Button></div>}
            <Modal
                open={openmodel}
                onClose={() => setOpenmodel(false)}
                title="View User Data"
            >
                <Modal.Section>
                    <TextContainer>
                        <Card title="Name"><Text>{newdata[0]?.name},{newdata[1]?.name}</Text>  </Card>
                        <Card title="Location" ><Text >{newdata[0]?.location},{newdata[1]?.location}</Text></Card>
                        <Card title="Orders"><Text >{newdata[0]?.orders},{newdata[1]?.orders}</Text></Card>
                        <Card title="AmountSpent" ><Text >{newdata[0]?.amountSpent},{newdata[1]?.amountSpent}</Text></Card>

                    </TextContainer>
                </Modal.Section>
            </Modal>
            <IndexTable
                resourceName={resourceName}
                itemCount={customers.length}
                selectedItemsCount={
                    allResourcesSelected ? 'All' : selectedResources.length
                }
                onSelectionChange={handleSelectionChange}
                headings={[
                    { title: 'Name' },
                    { title: 'Location' },
                    { title: 'Order count' },
                    { title: 'Amount spent' },
                    { title: 'Action' },
                ]}
            >
                {rowMarkup}
            </IndexTable>
            <Modal
                small
                open={active}
                onClose={() => setActive(false)}
                title="View User Data"
            >
                <Modal.Section>
                    <TextContainer>
                        <Card>
                            <Text>ID:{data.id}</Text>
                            <Text>Name:{data.name}</Text>
                            <Text>Location:{data.location}</Text>
                            <Text>Orders:{data.orders}</Text>
                            <Text>AmountSpent:{data.amountSpent}</Text>
                        </Card>
                    </TextContainer>
                </Modal.Section>
            </Modal>
        </Card>
        </Page>
    );
}

export default Home;