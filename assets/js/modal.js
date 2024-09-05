$(document).ready(function () {
    let currentElement = {};

    // Function to open modal
    function openModal() {
        $("#general-modal").show();
    }

    // Function to close modal
    function closeModal() {
        $("#general-modal").hide();
    }

    // Function to handle input changes
    function handleInputChange() {
        currentElement.content.text = $("#content-input").val();
        currentElement.fontSize = $("#font-size-input").val();
        currentElement.color = $("#font-color-input").val();
        currentElement.paddingTop = $("#padding-top").val();
        currentElement.paddingRight = $("#padding-right").val();
        currentElement.paddingBottom = $("#padding-bottom").val();
        currentElement.paddingLeft = $("#padding-left").val();
        currentElement.marginTop = $("#margin-top").val();
        currentElement.marginRight = $("#margin-right").val();
        currentElement.marginBottom = $("#margin-bottom").val();
        currentElement.marginLeft = $("#margin-left").val();
    }

    // Button click handlers for alignment
    $(".align-button").on("click", function () {
        currentElement.textAlign = $(this).data("align");
    });

    // Button click handlers for font weight
    $(".weight-button").on("click", function () {
        currentElement.fontWeight = $(this).data("weight");
    });

    // Button click handlers for text transform
    $(".transform-button").on("click", function () {
        currentElement.textTransform = $(this).data("transform");
    });

    // Button click handlers for text style
    $("#regular-style-button").on("click", function () {
        currentElement.isItalic = false;
        currentElement.isUnderline = false;
    });
    $("#italic-style-button").on("click", function () {
        currentElement.isItalic = !currentElement.isItalic;
    });
    $("#underline-style-button").on("click", function () {
        currentElement.isUnderline = !currentElement.isUnderline;
    });

    // Save button handler
    $("#save-button").on("click", function () {
        handleInputChange();
        // Update the element
        console.log("Updated Element:", currentElement);
        closeModal();
    });

    // Cancel button handler
    $("#cancel-button, #close-modal-button").on("click", function () {
        closeModal();
    });

    // Initialize with default values
    function initializeModal(element) {
        currentElement = element;
        $("#content-input").val(element.content.text);
        $("#font-size-input").val(element.fontSize);
        $("#font-color-input").val(element.color);
        $("#padding-top").val(element.paddingTop);
        $("#padding-right").val(element.paddingRight);
        $("#padding-bottom").val(element.paddingBottom);
        $("#padding-left").val(element.paddingLeft);
        $("#margin-top").val(element.marginTop);
        $("#margin-right").val(element.marginRight);
        $("#margin-bottom").val(element.marginBottom);
        $("#margin-left").val(element.marginLeft);
        openModal();
    }

    // Example of how to call initializeModal with an element
    const exampleElement = {
        content: { text: "Example Text" },
        fontSize: "16px",
        color: "#000000",
        paddingTop: "0px",
        paddingRight: "0px",
        paddingBottom: "0px",
        paddingLeft: "0px",
        marginTop: "0px",
        marginRight: "0px",
        marginBottom: "0px",
        marginLeft: "0px",
    };

    initializeModal(exampleElement);
});
$(document).ready(function () {
    let localStyle = {};
    let isTransparent = false;

    // Function to open modal
    function openGridCellStyleModal(styleData) {
        localStyle = styleData;
        isTransparent = styleData.backgroundColor === 'transparent';

        // Initialize inputs with current values
        $("#transparent-checkbox").prop("checked", isTransparent);
        $("#background-color-input").val(styleData.backgroundColor || '#ffffff');
        $("#padding-top").val(styleData.paddingTop || '0px');
        $("#padding-right").val(styleData.paddingRight || '0px');
        $("#padding-bottom").val(styleData.paddingBottom || '0px');
        $("#padding-left").val(styleData.paddingLeft || '0px');
        $("#margin-top").val(styleData.marginTop || '0px');
        $("#margin-right").val(styleData.marginRight || '0px');
        $("#margin-bottom").val(styleData.marginBottom || '0px');
        $("#margin-left").val(styleData.marginLeft || '0px');

        if (isTransparent) {
            $("#background-color-group").hide();
        } else {
            $("#background-color-group").show();
        }

        $("#grid-cell-style-modal").show();
    }

    // Function to close modal
    function closeGridCellStyleModal() {
        $("#grid-cell-style-modal").hide();
    }

    // Handle input changes
    $("#transparent-checkbox").on("change", function () {
        isTransparent = $(this).is(":checked");
        if (isTransparent) {
            localStyle.backgroundColor = 'transparent';
            $("#background-color-group").hide();
        } else {
            localStyle.backgroundColor = '#ffffff'; // Default to white
            $("#background-color-group").show();
        }
    });

    $("#background-color-input").on("input", function () {
        localStyle.backgroundColor = $(this).val();
    });

    $(".padding-margin-group input").on("input", function () {
        const name = $(this).attr("id").split('-')[1];
        localStyle[name] = $(this).val();
    });

    // Save button handler
    $("#save-grid-style-button").on("click", function () {
        console.log("Saving style data:", localStyle);
        closeGridCellStyleModal();
        // Add your save logic here
    });

    // Cancel button handler
    $("#cancel-grid-style-button, #close-grid-modal-button").on("click", function () {
        closeGridCellStyleModal();
    });

    // Example call to open the modal
    const exampleStyleData = {
        backgroundColor: '#ffffff',
        paddingTop: '10px',
        paddingRight: '10px',
        paddingBottom: '10px',
        paddingLeft: '10px',
        marginTop: '10px',
        marginRight: '10px',
        marginBottom: '10px',
        marginLeft: '10px',
    };

    // Call to initialize and open the modal
    openGridCellStyleModal(exampleStyleData);
});
$(document).ready(function () {
    let localImageData = {
        src: '',
        height: '',
        width: '',
        borderRadius: '',
        paddingTop: '0px',
        paddingRight: '0px',
        paddingBottom: '0px',
        paddingLeft: '0px',
        marginTop: '0px',
        marginRight: '0px',
        marginBottom: '0px',
        marginLeft: '0px',
        float: 'none',
        alignment: 'center'
    };

    function openImageModal(imageData) {
        localImageData = { ...imageData };
        $("#image-preview").attr("src", imageData.src || 'https://via.placeholder.com/200');
        $("#image-source-url").val(imageData.src);
        $("#image-height").val(imageData.height);
        $("#image-width").val(imageData.width);
        $("#image-border-radius").val(imageData.borderRadius);
        $("#padding-top").val(imageData.paddingTop);
        $("#padding-right").val(imageData.paddingRight);
        $("#padding-bottom").val(imageData.paddingBottom);
        $("#padding-left").val(imageData.paddingLeft);
        $("#margin-top").val(imageData.marginTop);
        $("#margin-right").val(imageData.marginRight);
        $("#margin-bottom").val(imageData.marginBottom);
        $("#margin-left").val(imageData.marginLeft);
        $("#image-float").val(imageData.float);
        $("#image-modal").show();
    }

    function closeImageModal() {
        $("#image-modal").hide();
    }

    $("#image-source-url").on("input", function () {
        const url = $(this).val();
        $("#image-preview").attr("src", url);
        localImageData.src = url;
    });

    $("#image-upload-frame").on("change", function (e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = function () {
                $("#image-preview").attr("src", reader.result);
                localImageData.src = reader.result;
            };
            reader.readAsDataURL(file);
        }
    });

    $(".align-button").on("click", function () {
        const alignment = $(this).data("align");
        localImageData.alignment = alignment;
    });

    $("#save-image-button").on("click", function () {
        console.log("Saved Image Data:", localImageData);
        // Save logic here
        closeImageModal();
    });

    $("#cancel-image-button, #close-image-modal-button").on("click", function () {
        closeImageModal();
    });

    // Example call to open the modal
    const exampleImageData = {
        src: 'https://via.placeholder.com/200',
        height: '200px',
        width: '200px',
        borderRadius: '0',
        paddingTop: '0px',
        paddingRight: '0px',
        paddingBottom: '0px',
        paddingLeft: '0px',
        marginTop: '0px',
        marginRight: '0px',
        marginBottom: '0px',
        marginLeft: '0px',
        float: 'none',
        alignment: 'center'
    };

    // Call to initialize and open the modal
    openImageModal(exampleImageData);
});
$(document).ready(function () {
    let listData = {
        items: [],
        fontColor: '#000000',
        fontWeight: '400',
        fontStyle: 'normal',
        listStyleType: 'none',
        ordered: false,
        textAlign: 'left'
    };

    function openListModal(data) {
        listData = { ...data };
        $("#font-color").val(listData.fontColor);
        $("#font-weight").val(listData.fontWeight);
        $("#font-style").val(listData.fontStyle);
        $("#list-type").val(listData.ordered ? 'ordered' : 'unordered');
        updateListStyleTypeOptions(listData.ordered);

        $("#list-style-type").val(listData.listStyleType);
        $(".align-button").removeClass('selected');
        $(`.align-button[data-align="${listData.textAlign}"]`).addClass('selected');

        populateListItems();
        $("#list-modal").show();
    }

    function closeListModal() {
        $("#list-modal").hide();
    }

    function populateListItems() {
        const container = $("#list-items-container");
        container.empty();
        listData.items.forEach((item, index) => {
            container.append(`<input type="text" class="modal-input list-item-input" data-index="${index}" value="${item}" placeholder="List item ${index + 1}" />`);
        });
    }

    function updateListStyleTypeOptions(ordered) {
        const options = ordered ?
            `<option value="decimal">Decimal</option>
<option value="decimal-leading-zero">Decimal Leading Zero</option>
<option value="lower-alpha">Lower Alpha</option>
<option value="upper-alpha">Upper Alpha</option>
<option value="lower-roman">Lower Roman</option>
<option value="upper-roman">Upper Roman</option>` :
            `<option value="none">None</option>
<option value="disc">Disc</option>
<option value="circle">Circle</option>
<option value="square">Square</option>`;
        $("#list-style-type").html(options);
    }

    $("#list-items-container").on("input", ".list-item-input", function () {
        const index = $(this).data("index");
        listData.items[index] = $(this).val();
    });

    $("#add-item-button").on("click", function () {
        listData.items.push('');
        populateListItems();
    });

    $("#remove-item-button").on("click", function () {
        listData.items.pop();
        populateListItems();
    });

    $("#list-type").on("change", function () {
        listData.ordered = $(this).val() === 'ordered';
        updateListStyleTypeOptions(listData.ordered);
    });

    $(".align-button").on("click", function () {
        listData.textAlign = $(this).data("align");
        $(".align-button").removeClass('selected');
        $(this).addClass('selected');
    });

    $("#save-list-button").on("click", function () {
        console.log("Saved List Data:", listData);
        closeListModal();
        // Save logic here
    });

    $("#cancel-list-button, #close-list-modal-button").on("click", function () {
        closeListModal();
    });

    // Example call to open the modal
    const exampleListData = {
        items: ['Item 1', 'Item 2', 'Item 3'],
        fontColor: '#000000',
        fontWeight: '400',
        fontStyle: 'normal',
        listStyleType: 'none',
        ordered: false,
        textAlign: 'left'
    };

    // Call to initialize and open the modal
    openListModal(exampleListData);
});
$(document).ready(function () {
    let tableData = {
        headers: [],
        rows: []
    };

    function openTableModal(data) {
        tableData = { ...data };
        populateTableEditor();
        $("#table-modal").show();
    }

    function closeTableModal() {
        $("#table-modal").hide();
    }

    function populateTableEditor() {
        const headersContainer = $("#table-headers");
        headersContainer.empty();
        tableData.headers.forEach((header, index) => {
            headersContainer.append(`
<th>
  <input type="text" class="modal-input" data-index="${index}" value="${header}" placeholder="Header ${index + 1}" />
</th>
`);
        });

        const rowsContainer = $("#table-rows");
        rowsContainer.empty();
        tableData.rows.forEach((row, rowIndex) => {
            let rowHTML = `<tr>`;
            row.cells.forEach((cell, cellIndex) => {
                rowHTML += `
  <td>
    <input type="text" class="modal-input table-cell-input" data-row="${rowIndex}" data-cell="${cellIndex}" value="${cell}" />
  </td>
`;
            });
            rowHTML += `</tr>`;
            rowsContainer.append(rowHTML);
        });
    }

    $("#table-headers").on("input", "input", function () {
        const index = $(this).data("index");
        tableData.headers[index] = $(this).val();
    });

    $("#table-rows").on("input", ".table-cell-input", function () {
        const rowIndex = $(this).data("row");
        const cellIndex = $(this).data("cell");
        tableData.rows[rowIndex].cells[cellIndex] = $(this).val();
    });

    $("#add-row-button").on("click", function () {
        tableData.rows.push({ cells: Array(tableData.headers.length).fill(''), styles: {} });
        populateTableEditor();
    });

    $("#remove-row-button").on("click", function () {
        tableData.rows.pop();
        populateTableEditor();
    });

    $("#add-column-button").on("click", function () {
        tableData.headers.push('');
        tableData.rows.forEach(row => row.cells.push(''));
        populateTableEditor();
    });

    $("#remove-column-button").on("click", function () {
        tableData.headers.pop();
        tableData.rows.forEach(row => row.cells.pop());
        populateTableEditor();
    });

    $("#save-table-button").on("click", function () {
        console.log("Saved Table Data:", tableData);
        closeTableModal();
        // Save logic here
    });

    $("#cancel-table-button, #close-table-modal-button").on("click", function () {
        closeTableModal();
    });

    // Example call to open the modal
    const exampleTableData = {
        headers: ['Header 1', 'Header 2', 'Header 3'],
        rows: [
            { cells: ['Row 1, Cell 1', 'Row 1, Cell 2', 'Row 1, Cell 3'], styles: {} },
            { cells: ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3'], styles: {} }
        ]
    };

    // Call to initialize and open the modal
    openTableModal(exampleTableData);
});
$(document).ready(function () {
    let rowStyles = {
        backgroundColor: '#ffffff',
        color: '#000000'
    };

    function openTableCellModal(styles) {
        rowStyles = { ...styles };
        $("#row-background-color").val(rowStyles.backgroundColor);
        $("#row-font-color").val(rowStyles.color);
        $("#table-cell-modal").show();
    }

    function closeTableCellModal() {
        $("#table-cell-modal").hide();
    }

    function handleStyleChange(styleName, value) {
        rowStyles[styleName] = value;
    }

    $("#row-background-color").on("input", function () {
        handleStyleChange('backgroundColor', $(this).val());
    });

    $("#row-font-color").on("input", function () {
        handleStyleChange('color', $(this).val());
    });

    $("#save-table-cell-button").on("click", function () {
        console.log("Saved Row Styles:", rowStyles);
        closeTableCellModal();
        // Save logic here
    });

    $("#cancel-table-cell-button, #close-table-cell-modal-button").on("click", function () {
        closeTableCellModal();
    });

    // Example call to open the modal
    const exampleRowStyles = {
        backgroundColor: '#ffffff',
        color: '#000000'
    };

    // Call to initialize and open the modal
    openTableCellModal(exampleRowStyles);
});
$(document).ready(function () {
    let rowStyles = {
        fontWeight: '400',
        textTransform: 'none',
        isItalic: false,
        isUnderline: false,
        textAlign: 'left',
        fontSize: 16,
        color: '#000000',
        backgroundColor: '#ffffff'
    };

    function openTableRowModal(styles) {
        rowStyles = { ...styles };
        $("#row-font-size").val(rowStyles.fontSize);
        $("#row-font-color").val(rowStyles.color);
        $("#row-background-color").val(rowStyles.backgroundColor);
        $("#table-row-modal").show();
    }

    function closeTableRowModal() {
        $("#table-row-modal").hide();
    }

    $(".align-button").on("click", function () {
        rowStyles.textAlign = $(this).data('align');
        $(".align-button").removeClass('selected');
        $(this).addClass('selected');
    });

    $(".weight-button").on("click", function () {
        rowStyles.fontWeight = $(this).data('weight');
        $(".weight-button").removeClass('selected');
        $(this).addClass('selected');
    });

    $(".transform-button").on("click", function () {
        rowStyles.textTransform = $(this).data('transform');
        $(".transform-button").removeClass('selected');
        $(this).addClass('selected');
    });

    $("#italic-style").on("click", function () {
        rowStyles.isItalic = !rowStyles.isItalic;
        $(this).toggleClass('selected');
    });

    $("#underline-style").on("click", function () {
        rowStyles.isUnderline = !rowStyles.isUnderline;
        $(this).toggleClass('selected');
    });

    $("#regular-style").on("click", function () {
        rowStyles.isItalic = false;
        rowStyles.isUnderline = false;
        $("#italic-style, #underline-style").removeClass('selected');
    });

    $("#row-font-size").on("input", function () {
        rowStyles.fontSize = $(this).val();
    });

    $("#row-font-color").on("input", function () {
        rowStyles.color = $(this).val();
    });

    $("#row-background-color").on("input", function () {
        rowStyles.backgroundColor = $(this).val();
    });

    $("#save-table-row-button").on("click", function () {
        console.log("Saved Row Styles:", rowStyles);
        closeTableRowModal();
        // Save logic here
    });

    $("#cancel-table-row-button, #close-table-row-modal").on("click", function () {
        closeTableRowModal();
    });

    // Example call to open the modal
    const exampleRowStyles = {
        fontWeight: '400',
        textTransform: 'none',
        isItalic: false,
        isUnderline: false,
        textAlign: 'left',
        fontSize: 16,
        color: '#000000',
        backgroundColor: '#ffffff'
    };

    // Call to initialize and open the modal
    openTableRowModal(exampleRowStyles);
});
$(document).ready(function () {
    let rowTwoStyles = {
        fontWeight: '400',
        textTransform: 'none',
        isItalic: false,
        isUnderline: false,
        textAlign: 'left',
        fontSize: 16,
        color: '#000000',
        backgroundColor: '#ffffff'
    };

    function openTableRowTwoModal(styles) {
        rowTwoStyles = { ...styles };
        $("#row-two-font-size").val(rowTwoStyles.fontSize);
        $("#row-two-font-color").val(rowTwoStyles.color);
        $("#row-two-background-color").val(rowTwoStyles.backgroundColor);
        $("#table-row-two-modal").show();
    }

    function closeTableRowTwoModal() {
        $("#table-row-two-modal").hide();
    }

    $(".align-button").on("click", function () {
        rowTwoStyles.textAlign = $(this).data('align');
        $(".align-button").removeClass('selected');
        $(this).addClass('selected');
    });

    $(".weight-button").on("click", function () {
        rowTwoStyles.fontWeight = $(this).data('weight');
        $(".weight-button").removeClass('selected');
        $(this).addClass('selected');
    });

    $(".transform-button").on("click", function () {
        rowTwoStyles.textTransform = $(this).data('transform');
        $(".transform-button").removeClass('selected');
        $(this).addClass('selected');
    });

    $("#italic-style-two").on("click", function () {
        rowTwoStyles.isItalic = !rowTwoStyles.isItalic;
        $(this).toggleClass('selected');
    });

    $("#underline-style-two").on("click", function () {
        rowTwoStyles.isUnderline = !rowTwoStyles.isUnderline;
        $(this).toggleClass('selected');
    });

    $("#regular-style-two").on("click", function () {
        rowTwoStyles.isItalic = false;
        rowTwoStyles.isUnderline = false;
        $("#italic-style-two, #underline-style-two").removeClass('selected');
    });

    $("#row-two-font-size").on("input", function () {
        rowTwoStyles.fontSize = $(this).val();
    });

    $("#row-two-font-color").on("input", function () {
        rowTwoStyles.color = $(this).val();
    });

    $("#row-two-background-color").on("input", function () {
        rowTwoStyles.backgroundColor = $(this).val();
    });

    $("#save-table-row-two-button").on("click", function () {
        console.log("Saved Row Two Styles:", rowTwoStyles);
        closeTableRowTwoModal();
        // Save logic here
    });

    $("#cancel-table-row-two-button, #close-table-row-two-modal").on("click", function () {
        closeTableRowTwoModal();
    });

    // Example call to open the modal
    const exampleRowTwoStyles = {
        fontWeight: '400',
        textTransform: 'none',
        isItalic: false,
        isUnderline: false,
        textAlign: 'left',
        fontSize: 16,
        color: '#000000',
        backgroundColor: '#ffffff'
    };

    // Call to initialize and open the modal
    openTableRowTwoModal(exampleRowTwoStyles);
});
$(document).ready(function () {
let tableTwoData = { rows: [] };

function openTableTwoModal(data) {
tableTwoData = data || { rows: [] };
const tableBody = $("#table-two-content tbody");
tableBody.empty();

// Populate table rows and cells
tableTwoData.rows.forEach((row, rowIndex) => {
const tr = $("<tr>").css(row.styles || {});
row.cells.forEach((cell, cellIndex) => {
const td = $("<td>").css({ border: '1px solid #ddd', padding: '8px', backgroundColor: '#e9ecef' });
const input = $("<input>").attr("type", "text").val(cell).css({ width: '100%', border: 'none', padding: '8px', boxSizing: 'border-box' });
input.on("input", function () {
  tableTwoData.rows[rowIndex].cells[cellIndex] = $(this).val();
});
td.append(input);
tr.append(td);
});
tableBody.append(tr);
});

$("#table-two-modal").show();
}

function closeTableTwoModal() {
$("#table-two-modal").hide();
}

$("#add-row-two").on("click", function () {
const newRow = { cells: Array(tableTwoData.rows[0]?.cells.length || 2).fill(''), styles: {} };
tableTwoData.rows.push(newRow);
openTableTwoModal(tableTwoData);
});

$("#remove-row-two").on("click", function () {
if (tableTwoData.rows.length > 0) {
tableTwoData.rows.pop();
openTableTwoModal(tableTwoData);
}
});

$("#add-column-two").on("click", function () {
tableTwoData.rows.forEach(row => {
row.cells.push('');
});
openTableTwoModal(tableTwoData);
});

$("#remove-column-two").on("click", function () {
if (tableTwoData.rows[0]?.cells.length > 1) {
tableTwoData.rows.forEach(row => {
row.cells.pop();
});
openTableTwoModal(tableTwoData);
}
});

$("#save-table-two-button").on("click", function () {
console.log("Saved Table Two Data:", tableTwoData);
closeTableTwoModal();
// Add your save logic here
});

$("#cancel-table-two-button, #close-table-two-modal").on("click", function () {
closeTableTwoModal();
});

// Example usage
const exampleTableTwoData = {
rows: [
{ cells: ['', ''], styles: {} },
{ cells: ['', ''], styles: {} }
]
};

// Call to open the modal for editing
openTableTwoModal(exampleTableTwoData);
});
