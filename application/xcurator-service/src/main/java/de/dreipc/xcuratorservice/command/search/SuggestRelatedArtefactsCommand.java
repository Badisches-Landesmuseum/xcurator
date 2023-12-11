package de.dreipc.xcuratorservice.command.search;

import de.dreipc.elasticsearch.MultiIndexQuery;
import de.dreipc.xcuratorservice.command.search.artefact.ArtefactQueryBuilder;
import de.dreipc.xcuratorservice.command.search.artefact.ArtefactResultConverter;
import de.dreipc.xcuratorservice.data.artefact.Artefact;
import de.dreipc.xcuratorservice.data.artefact.ArtefactRepository;
import de.dreipc.xcuratorservice.data.explorer.domain.ArtefactItemResult;
import de.dreipc.xcuratorservice.data.explorer.domain.ArtefactSearchInput;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

@Component
public class SuggestRelatedArtefactsCommand {

    private static final String ARTEFACT_INDEX = "xcurator.artefact";
    private final ArtefactQueryBuilder artefactQueryBuilder;
    private final MultiIndexQuery multiIndexQuery;
    private final ArtefactResultConverter artefactResultConverter;
    private final ArtefactRepository artefactRepository;

    private SuggestRelatedArtefactsCommand(
            ArtefactQueryBuilder artefactQueryBuilder,
            MultiIndexQuery multiIndexQuery,
            ArtefactResultConverter artefactResultConverter,
            ArtefactRepository artefactRepository) {
        this.artefactQueryBuilder = artefactQueryBuilder;
        this.multiIndexQuery = multiIndexQuery;
        this.artefactResultConverter = artefactResultConverter;
        this.artefactRepository = artefactRepository;
    }

    public List<Artefact> execute(ArtefactSearchInput artefactInput, Integer take) {

        var query = artefactQueryBuilder.buildQuery(artefactInput, take);

        var artefactQuery = new MultiIndexQuery.IndexQuery(ARTEFACT_INDEX, query);

        try {
            var result = multiIndexQuery.executeSearch(List.of(artefactQuery));

            var artefactResult =
                    artefactResultConverter.execute(artefactInput.getQueryString(), result.get(ARTEFACT_INDEX));

            var artefactIds = artefactResult.getItems().stream()
                    .map(ArtefactItemResult::id)
                    .toList();

            return artefactRepository.findAllById(artefactIds);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
