import logging

console = logging.StreamHandler()
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
console.setFormatter(formatter)
LOG = logging.getLogger("Dark Protein")
LOG.addHandler(console)
LOG.setLevel(logging.INFO)


class DarkProtein:
    def __init__(self,
                 primary_accession=None,
                 domain=None,
                 kingdom=None,
                 organism_id=None,
                 darkness=None,
                 length=None,
                 disorder=None,
                 compositional_bias=None,
                 membrane=None):
        self._primary_accession = primary_accession
        self._domain = domain
        self._kingdom = kingdom
        self._organism_id = organism_id
        self._darkness = darkness
        self._length = length
        self._disorder = disorder
        self._compositional_bias = compositional_bias
        self._membrane = membrane

    @property
    def primary_accession(self):
        return self._primary_accession

    @primary_accession.setter
    def primary_accession(self, value):
        self._primary_accession = value

    @property
    def domain(self):
        return self._domain

    @domain.setter
    def domain(self, value):
        self._domain = value

    @property
    def kingdom(self):
        return self._kingdom

    @kingdom.setter
    def kingdom(self, value):
        self._kingdom = value

    @property
    def organism_id(self):
        return self._organism_id

    @organism_id.setter
    def organism_id(self, value):
        self._organism_id = value

    @property
    def darkness(self):
        return self._darkness

    @darkness.setter
    def darkness(self, value):
        self._darkness = value

    @property
    def length(self):
        return self._length

    @length.setter
    def length(self, value):
        self._length = value

    @property
    def disorder(self):
        return self._disorder

    @disorder.setter
    def disorder(self, value):
        self._disorder = value

    @property
    def compositional_bias(self):
        return self._compositional_bias

    @compositional_bias.setter
    def compositional_bias(self, value):
        self._compositional_bias = value

    @property
    def membrane(self):
        return self._membrane

    @membrane.setter
    def membrane(self, value):
        self._membrane = value

    def __eq__(self, other):
        if isinstance(other, self.__class__):
            return self.__dict__ == other.__dict__
        return NotImplemented

    def __ne__(self, other):
        comparison = self.__eq__(other)
        if comparison is not NotImplemented:
            return not comparison
        return NotImplemented

    def __str__(self):
        retr_str = ""

        retr_str += ("Primary accession: " + self.primary_accession + "\n")
        retr_str += ("Domain: " + self.domain + "\n")
        retr_str += ("Kingdom" + self.kingdom + "\n")
        retr_str += ("Organism ID: " + self.organism_id + "\n")
        retr_str += ("Darkness: " + self.darkness + "\n")
        retr_str += ("Length: " + self.length + "\n")
        retr_str += ("Disorder: " + self.disorder + "\n")
        retr_str += ("Compositional bias: " + self.compositional_bias + "\n")
        retr_str += ("Membrane: " + self.membrane + "\n")

        return retr_str

    def __repr__(self):
        return str(self)
