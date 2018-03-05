export let button = [
    `
    <Button>Default</Button>
    <Button type="primary">Primary</Button>
    <Button type="ghost">Ghost</Button>
    <Button type="dashed">Dashed</Button>
    <Button type="text">Text</Button>
    <br><br>
    <Button type="info">Info</Button>
    <Button type="success">Success</Button>
    <Button type="warning">Warning</Button>
    <Button type="error">Error</Button>
    `,
    `
    <Button type="primary" shape="circle" icon="ios-search"></Button>
    <Button type="primary" icon="ios-search">Search</Button>
    <Button type="primary" shape="circle" icon="ios-search">Search</Button>
    <Button type="primary" shape="circle">Circle</Button>
    <br><br>
    <Button type="ghost" shape="circle" icon="ios-search"></Button>
    <Button type="ghost" icon="ios-search">Search</Button>
    <Button type="ghost" shape="circle" icon="ios-search">Search</Button>
    <Button type="ghost" shape="circle">Circle</Button>
    `,
    `
    <Button type="primary" size="large">Large</Button>
    <Button type="primary">Default</Button>
    <Button type="primary" size="small">Small</Button>
    <br><br>
    <Button type="primary" shape="circle" size="large">Large</Button>
    <Button type="primary" shape="circle">Default</Button>
    <Button type="primary" shape="circle" size="small">Small</Button>
    `,
    `
    <Button type="success" long>SUBMIT</Button>
    <br><br>
    <Button type="error" long>DELETE</Button>
    `,
    `
    <Button>Default</Button>
    <Button disabled>Default(Disabled)</Button>
    <br>
    <Button type="primary">Primary</Button>
    <Button type="primary" disabled>Primary(Disabled)</Button>
    <br>
    <Button type="ghost">Ghost</Button>
    <Button type="ghost" disabled>Ghost(Disabled)</Button>
    <br>
    <Button type="dashed">Dashed</Button>
    <Button type="dashed" disabled>Dashed(Disabled)</Button>
    <br>
    <Button type="text">Text</Button>
    <Button type="text" disabled>Text(Disabled)</Button>
    `,
    `
    <Button type="primary" loading>Loading...</Button>
    `,
    `
    <ButtonGroup>
        <Button>Cancel</Button>
        <Button type="primary">Confirm</Button>
    </ButtonGroup>
    <ButtonGroup>
        <Button disabled>Yesterday</Button>
        <Button disabled>Today</Button>
        <Button disabled>Tomorrow</Button>
    </ButtonGroup>
    <ButtonGroup>
        <Button type="primary">L</Button>
        <Button>M</Button>
        <Button type="ghost">M</Button>
        <Button type="dashed">R</Button>
    </ButtonGroup>
    <br><br>
    Icons
    <br><br>
    <ButtonGroup>
        <Button type="primary">
            <Icon type="chevron-left"></Icon>
            Backward
        </Button>
        <Button type="primary">
            Forward
            <Icon type="chevron-right"></Icon>
        </Button>
    </ButtonGroup>
    <ButtonGroup>
        <Button type="primary" icon="ios-skipbackward"></Button>
        <Button type="primary" icon="ios-skipforward"></Button>
    </ButtonGroup>
    <ButtonGroup>
        <Button type="ghost" icon="ios-color-wand-outline"></Button>
        <Button type="ghost" icon="ios-sunny-outline"></Button>
        <Button type="ghost" icon="ios-crop"></Button>
        <Button type="ghost" icon="ios-color-filter-outline"></Button>
    </ButtonGroup>
    <br><br>
    Circle
    <br><br>
    <ButtonGroup shape="circle">
        <Button type="primary">
            <Icon type="chevron-left"></Icon>
            Backward
        </Button>
        <Button type="primary">
            Forward
            <Icon type="chevron-right"></Icon>
        </Button>
    </ButtonGroup>
    <ButtonGroup shape="circle">
        <Button type="primary" icon="ios-skipbackward"></Button>
        <Button type="primary" icon="ios-skipforward"></Button>
    </ButtonGroup>
    <ButtonGroup shape="circle">
        <Button type="ghost" icon="ios-color-wand-outline"></Button>
        <Button type="ghost" icon="ios-sunny-outline"></Button>
        <Button type="ghost" icon="ios-crop"></Button>
        <Button type="ghost" icon="ios-color-filter-outline"></Button>
    </ButtonGroup>
    <br><br>
    Size
    <br><br>
    <ButtonGroup size="large">
        <Button type="ghost">Large</Button>
        <Button type="ghost">Large</Button>
    </ButtonGroup>
    <ButtonGroup>
        <Button type="ghost">Default</Button>
        <Button type="ghost">Default</Button>
    </ButtonGroup>
    <ButtonGroup size="small">
        <Button type="ghost">Small</Button>
        <Button type="ghost">Small</Button>
    </ButtonGroup>
    <br><br>
    <ButtonGroup size="large" shape="circle">
        <Button type="ghost">Large</Button>
        <Button type="ghost">Large</Button>
    </ButtonGroup>
    <ButtonGroup shape="circle">
        <Button type="ghost">Default</Button>
        <Button type="ghost">Default</Button>
    </ButtonGroup>
    <ButtonGroup size="small" shape="circle">
        <Button type="ghost">Small</Button>
        <Button type="ghost">Small</Button>
    </ButtonGroup>
    `,
    `
    <ButtonGroup vertical>
        <Button type="ghost" icon="social-facebook"></Button>
        <Button type="ghost" icon="social-twitter"></Button>
        <Button type="ghost" icon="social-googleplus"></Button>
        <Button type="ghost" icon="social-tumblr"></Button>
    </ButtonGroup>
    `
];

export let tag = [
    `
    <Tag>标签一</Tag>
    <Tag>标签二</Tag>
    <Tag closable>标签三</Tag>
    `,
    `
    <Tag type="border">标签三</Tag>
    <Tag type="border" closable>标签四</Tag>
    <Tag type="dot">标签一</Tag>
    <Tag type="dot" closable>标签二</Tag>
    `,
    `
    <Tag closable color="blue">标签一</Tag>
    <Tag closable color="green">标签二</Tag>
    <Tag closable color="red">标签三</Tag>
    <Tag closable color="yellow">标签四</Tag>
    <br><br>
    <Tag type="border" closable color="blue">标签一</Tag>
    <Tag type="border" closable color="green">标签二</Tag>
    <Tag type="border" closable color="red">标签三</Tag>
    <Tag type="border" closable color="yellow">标签四</Tag>
    <br><br>
    <Tag type="dot" closable color="blue">标签一</Tag>
    <Tag type="dot" closable color="green">标签二</Tag>
    <Tag type="dot" closable color="red">标签三</Tag>
    <Tag type="dot" closable color="yellow">标签四</Tag>
    `,
    `
    <Tag checkable color="blue">标签一</Tag>
    <Tag checkable color="green">标签二</Tag>
    <Tag checkable color="red">标签三</Tag>
    <Tag checkable color="yellow">标签四</Tag>
    `
];
