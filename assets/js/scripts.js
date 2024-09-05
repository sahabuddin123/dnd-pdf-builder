$(document).ready(function () {
    let elements = [];
    let editingIndex = null;
    let currentElement = {};
    let currentRowIndex = null;

    // Function to open modal
    function openModal(modalId) {
        $("#" + modalId).show();
    }

    // Function to close modal
    function closeModal(modalId) {
        $("#" + modalId).hide();
    }

    // Event handler for close button
    $(".close-btn").on("click", function () {
        $(this).closest(".modal").hide();
    });

    // Drag and Drop functionality
    $(".draggable").on("dragstart", function (event) {
        event.originalEvent.dataTransfer.setData("text", $(this).attr("data-type"));
    });

    $("#drop-zone").on("dragover", function (event) {
        event.preventDefault();
    });

    $("#drop-zone").on("drop", function (event) {
        event.preventDefault();
        const elementType = event.originalEvent.dataTransfer.getData("text");
        let newElement = { type: elementType, content: '' };

        switch (elementType) {
            case 'table':
                newElement.content = {
                    headers: ['Date', 'Time', 'Event', 'Client Address', 'Queued Hours', 'Worked Hours', 'Extra', 'Total', 'Paid'],
                    rows: [
                        { cells: ['', '', '', '', '', '', '', '', ''], styles: {} },
                        { cells: ['', '', '', '', '', '', '', '', ''], styles: {} },
                        { cells: ['', '', '', '', '', '', '', '', ''], styles: {} },
                    ],
                };
                openModal('tableModal');
                break;
            case 'table-two':
                newElement.content = {
                    headers: [' ', ' '],
                    rows: [
                        { cells: ['', ''], styles: {} },
                        { cells: ['', ''], styles: {} },
                    ],
                };
                openModal('tableTwoModal');
                break;
            case 'image':
                newElement.content = {
                    src: 'https://via.placeholder.com/200',
                    height: '200px',
                    width: '200px',
                    borderRadius: 0,
                    float: 'none',
                    alignment: 'center'
                };
                openModal('imageModal');
                break;
            case 'one-list':
                newElement.content = {
                    items: ['List One', 'List Two', 'List Three'],
                    fontColor: '#000000',
                    fontWeight: '400',
                    fontStyle: 'normal',
                    listStyleType: 'none',
                    ordered: false,
                    textAlign: 'left'
                };
                openModal('listModal');
                break;
            case 'invoice-header':
            case 'invoice-logo':
            case 'company-logo':
            case 'company-address':
            case 'client-address':
            case 'bank-details':
            case 'invoice-title':
            case 'invoice-table':
            case 'invoice-details':
            case 'total-amount-table':
            case 'qr-code':
            case 'invoice-footer':
                newElement.content = {
                    companySettings: {}, 
                    invoice: {}
                };
                openModal('readymadeModal'); // Opens modal for readymade elements
                break;
            default:
                openModal('genericModal');
                break;
        }

        elements.push(newElement);
        renderElements();
    });

    function renderElements() {
        $("#drop-zone").empty();
        elements.forEach((element, index) => {
            let htmlContent = '';
            switch (element.type) {
                case 'table':
                    htmlContent = '<div class="element"><table style="width:100%; border-collapse: collapse;">';
                    htmlContent += '<thead><tr>';
                    element.content.headers.forEach(header => {
                        htmlContent += `<th style="border: 1px solid #ddd; padding: 8px;">${header}</th>`;
                    });
                    htmlContent += '</tr></thead><tbody>';
                    element.content.rows.forEach(row => {
                        htmlContent += '<tr>';
                        row.cells.forEach(cell => {
                            htmlContent += `<td style="border: 1px solid #ddd; padding: 8px;">${cell}</td>`;
                        });
                        htmlContent += '</tr>';
                    });
                    htmlContent += '</tbody></table></div>';
                    break;
                case 'table-two':
                    htmlContent = '<div class="element"><table style="width:100%; border-collapse: collapse;">';
                    element.content.rows.forEach(row => {
                        htmlContent += '<tr>';
                        row.cells.forEach(cell => {
                            htmlContent += `<td style="border: 1px solid #ddd; padding: 8px;">${cell}</td>`;
                        });
                        htmlContent += '</tr>';
                    });
                    htmlContent += '</table></div>';
                    break;
                case 'image':
                    htmlContent = `<img src="${element.content.src}" style="height:${element.content.height}; width:${element.content.width}; border-radius:${element.content.borderRadius}px; float:${element.content.float}; margin:${element.content.marginTop} ${element.content.marginRight} ${element.content.marginBottom} ${element.content.marginLeft}; padding:${element.content.paddingTop} ${element.content.paddingRight} ${element.content.paddingBottom} ${element.content.paddingLeft};"/>`;
                    break;
                case 'one-list':
                    htmlContent = `<ul style="color: ${element.content.fontColor}; font-weight: ${element.content.fontWeight}; font-style: ${element.content.fontStyle}; text-align: ${element.content.textAlign}; list-style-type: ${element.content.listStyleType};">`;
                    element.content.items.forEach(item => htmlContent += `<li>${item}</li>`);
                    htmlContent += '</ul>';
                    break;
                case 'invoice-header':
                case 'invoice-logo':
                case 'company-logo':
                case 'company-address':
                case 'client-address':
                case 'bank-details':
                case 'invoice-title':
                case 'invoice-table':
                case 'invoice-details':
                case 'total-amount-table':
                case 'qr-code':
                case 'invoice-footer':
                    htmlContent = `<div class='readymade-element'>Readymade Content for ${element.type}</div>`;
                    break;
                default:
                    htmlContent = '<div>Default Element Content</div>';
                    break;
            }
            $("#drop-zone").append(htmlContent);
        });
    }

    // Save changes handlers for modals
    $("#saveImageChanges").on("click", function () {
        const imageUrl = $("#imageUpload").val();
        elements[editingIndex].content.src = imageUrl;
        renderElements();
        closeModal('imageModal');
    });

    $("#saveTableChanges").on("click", function () {
        const updatedHeaders = ['Updated Header 1', 'Updated Header 2']; // Example update
        elements[editingIndex].content.headers = updatedHeaders;
        renderElements();
        closeModal('tableModal');
    });

    $("#saveTableTwoChanges").on("click", function () {
        const updatedRows = [
            { cells: ['Updated Cell 1', 'Updated Cell 2'] },
            { cells: ['Updated Cell 3', 'Updated Cell 4'] }
        ];
        elements[editingIndex].content.rows = updatedRows;
        renderElements();
        closeModal('tableTwoModal');
    });

    $("#saveListChanges").on("click", function () {
        const updatedItems = ['Updated List Item 1', 'Updated List Item 2'];
        elements[editingIndex].content.items = updatedItems;
        renderElements();
        closeModal('listModal');
    });

    $("#saveReadymadeChanges").on("click", function () {
        elements[editingIndex].content.companySettings = { name: "Updated Company Name" };
        renderElements();
        closeModal('readymadeModal');
    });

    $("#saveGenericChanges").on("click", function () {
        elements[editingIndex].content = 'Updated Generic Content';
        renderElements();
        closeModal('genericModal');
    });

    // Add more save handlers similarly for other modals...
});
