package de.dreipc.xcuratorservice.service;

import de.dreipc.xcuratorservice.data.explorer.GridInfo;
import de.dreipc.xcuratorservice.data.explorer.domain.ExploreItemPin;
import de.dreipc.xcuratorservice.data.explorer.domain.ExploreItemSize;
import de.dreipc.xcuratorservice.data.explorer.navigu.NaviguItem;
import de.dreipc.xcuratorservice.data.explorer.navigu.NaviguResult;
import de.dreipc.xcuratorservice.data.explorer.navigu.NavinguInputElement;
import de.pixolution.embeddingsGrid.api.ArrangeGridRequest;
import de.pixolution.embeddingsGrid.model.SortingRequestGridJson;
import de.pixolution.embeddingsGrid.model.SortingRequestImagesInnerJson;
import de.pixolution.embeddingsGrid.model.SortingRequestJson;
import de.pixolution.embeddingsGrid.model.SortingResponseSortedImagesInnerJson;
import de.pixolution.som.data.EmbeddingData;
import de.pixolution.som.data.Grid;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.*;
import java.util.concurrent.CompletableFuture;
import javax.naming.directory.InvalidAttributesException;

@Component
public class NavinguService {

    private final boolean ENDLESS_GRID_MODE = true;
    private final BigDecimal DEFAULT_ASPECT_RATIO = new BigDecimal("1.0");

    public CompletableFuture<NaviguResult> clusterByEmbeddings(List<NavinguInputElement> items) {
        if (items.isEmpty()) return CompletableFuture.supplyAsync(this::emptyResult);

        return CompletableFuture.supplyAsync(() -> {
            var sortingImages = items.stream()
                    .map(item -> {
                        var base64Embedding = encodeBase64(item.getEmbedding());
                        var sortingImage =
                                new SortingRequestImagesInnerJson(item.getId().toString(), base64Embedding);

                        return sortingImage;
                    })
                    .toList();

            var gridRequest = new SortingRequestGridJson(ENDLESS_GRID_MODE, DEFAULT_ASPECT_RATIO);
            var sortingRequest = new SortingRequestJson(sortingImages, gridRequest);

            // Found
            ArrangeGridRequest arrangeTask;
            try {
                arrangeTask = new ArrangeGridRequest(sortingRequest);
            } catch (InvalidAttributesException e) {
                throw new RuntimeException(e);
            }

            Grid sortedGrid = arrangeTask.arrange();
            var navinguItems = Arrays.stream(sortedGrid.getElements())
                    .filter(Objects::nonNull)
                    .map(this::convertData)
                    .map(sortedItem -> this.toItem(sortedItem, items))
                    .toList();

            return NaviguResult.builder()
                    .gridInfo(GridInfo.builder()
                            .columns(sortedGrid.getColumns())
                            .rows(sortedGrid.getRows())
                            .build())
                    .items(navinguItems)
                    .build();
        });
    }

    private NaviguResult emptyResult() {
        return NaviguResult.builder()
                .gridInfo(GridInfo.builder().columns(0).rows(0).build())
                .items(Collections.emptyList())
                .build();
    }

    private String encodeBase64(float[] embedding) {
        return Base64.getEncoder().encodeToString(EmbeddingData.floatToByteArray(embedding));
    }

    private NaviguItem toItem(SortingResponseSortedImagesInnerJson sortedImage, List<NavinguInputElement> items) {
        var pin = new ExploreItemPin(sortedImage.getColumn(), sortedImage.getRow());

        int itemSize = items.stream()
                .filter(item -> item.getId().toString().equals(sortedImage.getId()))
                .findFirst()
                .map(NavinguInputElement::getSize)
                .orElse(1);
        var size = new ExploreItemSize(itemSize, itemSize);
        var objectId = new ObjectId(sortedImage.getId());

        return NaviguItem.builder()
                .pin(pin)
                .size(size)
                .relatedObjectId(objectId)
                .build();
    }

    private SortingResponseSortedImagesInnerJson convertData(EmbeddingData data) {
        SortingResponseSortedImagesInnerJson converted = new SortingResponseSortedImagesInnerJson();
        converted.setId(data.getId());
        converted.setColumn(data.getColumn());
        converted.setRow(data.getRow());
        converted.setSizeCols(data.getSizeColumns());
        converted.setSizeRows(data.getSizeRows());
        return converted;
    }
}
